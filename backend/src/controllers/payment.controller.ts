import { Request, Response } from 'express';
import { MpesaService } from '../services/mpesa.service';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';
import { PaymentStatus } from '@prisma/client';

export class PaymentController {
    static async initiatePayment(req: AuthRequest, res: Response) {
        try {
            const { amount, phoneNumber, leaseId } = req.body;
            const { userId } = req.user!;

            // Create a pending payment record
            const payment = await prisma.payment.create({
                data: {
                    amount: parseFloat(amount),
                    phoneNumber,
                    status: 'PENDING',
                    method: 'MPESA',
                    leaseId: leaseId || null,
                    tenantId: userId,
                }
            });

            // Initiate STK Push
            const response = await MpesaService.initiateStkPush(amount, phoneNumber, payment.id);

            // Update payment with CheckoutRequestID for tracking the callback
            await prisma.payment.update({
                where: { id: payment.id },
                data: { mpesaReceiptNumber: response.CheckoutRequestID }
            });

            return res.status(200).json({
                message: 'Payment initiated successfully. Please check your phone for the M-Pesa prompt.',
                paymentId: payment.id,
                checkoutRequestId: response.CheckoutRequestID
            });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async mpesaCallback(req: Request, res: Response) {
        try {
            const { Body } = req.body;
            const stkCallback = Body.stkCallback;

            const checkoutRequestId = stkCallback.CheckoutRequestID;
            const resultCode = stkCallback.ResultCode;

            // Find the payment record
            const payment = await prisma.payment.findFirst({
                where: { mpesaReceiptNumber: checkoutRequestId }
            });

            if (!payment) {
                return res.status(404).json({ error: 'Payment record not found' });
            }

            if (resultCode === 0) {
                // Success
                const callbackMetadata = stkCallback.CallbackMetadata.Item;
                const receipt = callbackMetadata.find((i: any) => i.Name === 'MpesaReceiptNumber')?.Value;

                await prisma.payment.update({
                    where: { id: payment.id },
                    data: {
                        status: 'COMPLETED',
                        mpesaReceiptNumber: receipt,
                        paidAt: new Date(),
                    }
                });

            } else {
                // Failed
                await prisma.payment.update({
                    where: { id: payment.id },
                    data: {
                        status: 'FAILED',
                    }
                });
            }

            return res.status(200).json({ message: 'Callback received' });
        } catch (error: any) {
            console.error('M-Pesa Callback Error:', error);
            return res.status(500).json({ error: 'Internal server error processing callback' });
        }
    }

    static async getMyPayments(req: AuthRequest, res: Response) {
        try {
            const payments = await prisma.payment.findMany({
                where: { tenantId: req.user!.userId },
                include: {
                    lease: {
                        include: {
                            unit: true
                        }
                    }
                },
                orderBy: { createdAt: 'desc' }
            });
            return res.status(200).json(payments);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async getAllPayments(req: AuthRequest, res: Response) {
        try {
            const { landlordId, status } = req.query;

            const payments = await prisma.payment.findMany({
                where: {
                    ...(status && { status: status as PaymentStatus }),
                    ...(landlordId && {
                        lease: {
                            unit: {
                                property: { landlordId: landlordId as string }
                            }
                        }
                    })
                },
                include: {
                    tenant: {
                        select: { firstName: true, lastName: true, email: true }
                    },
                    lease: {
                        include: {
                            unit: {
                                include: { property: true }
                            }
                        }
                    }
                },
                orderBy: { createdAt: 'desc' }
            });
            return res.status(200).json(payments);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}
