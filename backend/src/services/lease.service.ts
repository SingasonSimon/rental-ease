import prisma from '../config/database';
import { LeaseStatus, PaymentFrequency } from '@prisma/client';

export class LeaseService {
    static async getAllLeases(filters: any = {}) {
        const { tenantId, landlordId, status, unitId } = filters;

        return await prisma.lease.findMany({
            where: {
                ...(tenantId && { tenantId }),
                ...(unitId && { unitId }),
                ...(status && { status: status as LeaseStatus }),
                ...(landlordId && {
                    unit: {
                        property: { landlordId }
                    }
                }),
            },
            include: {
                unit: {
                    include: {
                        property: true
                    }
                },
                tenant: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    }
                }
            }
        });
    }

    static async getLeaseById(id: string) {
        return await prisma.lease.findUnique({
            where: { id },
            include: {
                unit: {
                    include: {
                        property: true
                    }
                },
                tenant: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    }
                },
                payments: {
                    orderBy: { createdAt: 'asc' }
                }
            }
        });
    }

    static async getLeasesByTenant(tenantId: string) {
        return await prisma.lease.findMany({
            where: { tenantId },
            include: {
                unit: {
                    include: {
                        property: true
                    }
                }
            }
        });
    }

    static async createLease(leaseData: any) {
        const { unitId, tenantId, startDate, endDate, rentAmount, paymentFrequency, securityDeposit, terms, createdBy } = leaseData;

        return await prisma.$transaction(async (tx) => {
            const lease = await tx.lease.create({
                data: {
                    unitId,
                    tenantId,
                    startDate: new Date(startDate),
                    endDate: new Date(endDate),
                    rentAmount: parseFloat(rentAmount),
                    paymentFrequency: (paymentFrequency as PaymentFrequency) || 'MONTHLY',
                    securityDeposit: securityDeposit ? parseFloat(securityDeposit) : null,
                    terms,
                    createdBy,
                    status: 'ACTIVE',
                }
            });

            await tx.unit.update({
                where: { id: unitId },
                data: { status: 'OCCUPIED' }
            });

            return lease;
        });
    }

    static async updateLease(id: string, updateData: any) {
        const formattedData = { ...updateData };
        if (updateData.startDate) formattedData.startDate = new Date(updateData.startDate);
        if (updateData.endDate) formattedData.endDate = new Date(updateData.endDate);
        if (updateData.rentAmount) formattedData.rentAmount = parseFloat(updateData.rentAmount);
        if (updateData.securityDeposit) formattedData.securityDeposit = parseFloat(updateData.securityDeposit);

        return await prisma.lease.update({
            where: { id },
            data: formattedData
        });
    }

    static async terminateLease(id: string) {
        return await prisma.$transaction(async (tx) => {
            const lease = await tx.lease.update({
                where: { id },
                data: { status: 'TERMINATED', updatedAt: new Date() }
            });

            await tx.unit.update({
                where: { id: lease.unitId },
                data: { status: 'AVAILABLE' }
            });

            return lease;
        });
    }
}
