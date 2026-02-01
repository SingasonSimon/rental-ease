"use client";

import { useState } from "react";
import { CreditCard, Download, CheckCircle, Clock, XCircle, Smartphone, Loader2 } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface Payment {
    id: string;
    amount: number;
    date: string;
    status: "COMPLETED" | "PENDING" | "FAILED";
    reference: string;
    method: string;
}

export default function PaymentsPage() {
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    const rentDue = 65000;

    const payments: Payment[] = [
        { id: "1", amount: 65000, date: "Jan 5, 2026", status: "COMPLETED", reference: "MPE12345ABC", method: "M-Pesa" },
        { id: "2", amount: 65000, date: "Dec 5, 2025", status: "COMPLETED", reference: "MPE12344XYZ", method: "M-Pesa" },
        { id: "3", amount: 65000, date: "Nov 5, 2025", status: "COMPLETED", reference: "MPE12343DEF", method: "M-Pesa" },
        { id: "4", amount: 65000, date: "Oct 5, 2025", status: "FAILED", reference: "MPE12342GHI", method: "M-Pesa" },
    ];

    const getStatusBadge = (status: Payment["status"]) => {
        switch (status) {
            case "COMPLETED":
                return <Badge variant="success"><CheckCircle className="h-3 w-3 mr-1" /> Completed</Badge>;
            case "PENDING":
                return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
            case "FAILED":
                return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Failed</Badge>;
        }
    };

    const handlePayment = async () => {
        if (!phoneNumber || phoneNumber.length < 10) return;

        setIsProcessing(true);
        // Simulate M-Pesa STK Push
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsProcessing(false);
        setIsPaymentModalOpen(false);
        alert("STK Push sent to " + phoneNumber + ". Please enter your M-Pesa PIN.");
    };

    return (
        <div className="flex flex-col h-full">
            <DashboardHeader
                title="Payments"
                description="Manage your rent payments and view history"
            />

            <div className="flex-1 p-6 space-y-6 overflow-auto">
                {/* Payment Summary */}
                <div className="grid md:grid-cols-3 gap-4">
                    <Card className="border-primary">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Current Due</p>
                                    <p className="text-3xl font-bold text-primary">KES {rentDue.toLocaleString()}</p>
                                    <p className="text-sm text-muted-foreground mt-1">Due by Feb 5, 2026</p>
                                </div>
                                <div className="p-4 bg-primary/10 rounded-full">
                                    <CreditCard className="h-8 w-8 text-primary" />
                                </div>
                            </div>
                            <Button className="w-full mt-4" onClick={() => setIsPaymentModalOpen(true)}>
                                <Smartphone className="h-4 w-4 mr-2" /> Pay with M-Pesa
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6 text-center">
                            <p className="text-sm text-muted-foreground">Total Paid</p>
                            <p className="text-3xl font-bold">KES 195,000</p>
                            <p className="text-sm text-muted-foreground mt-1">Last 3 months</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6 text-center">
                            <p className="text-sm text-muted-foreground">Payment Status</p>
                            <p className="text-3xl font-bold text-green-500">On Time</p>
                            <p className="text-sm text-muted-foreground mt-1">No late payments</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Payment Modal */}
                {isPaymentModalOpen && (
                    <Card className="border-primary/50">
                        <CardHeader>
                            <CardTitle>Pay Rent via M-Pesa</CardTitle>
                            <CardDescription>Enter your M-Pesa phone number to receive STK Push</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">Amount</label>
                                <p className="text-2xl font-bold">KES {rentDue.toLocaleString()}</p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">M-Pesa Phone Number</label>
                                <Input
                                    type="tel"
                                    placeholder="0712345678"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-3">
                                <Button onClick={handlePayment} disabled={isProcessing} className="flex-1">
                                    {isProcessing ? (
                                        <>
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Smartphone className="h-4 w-4 mr-2" /> Send STK Push
                                        </>
                                    )}
                                </Button>
                                <Button variant="outline" onClick={() => setIsPaymentModalOpen(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Payment History */}
                <Card>
                    <CardHeader>
                        <CardTitle>Payment History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-3 px-4 font-medium">Date</th>
                                        <th className="text-left py-3 px-4 font-medium">Amount</th>
                                        <th className="text-left py-3 px-4 font-medium">Reference</th>
                                        <th className="text-left py-3 px-4 font-medium">Method</th>
                                        <th className="text-left py-3 px-4 font-medium">Status</th>
                                        <th className="text-right py-3 px-4 font-medium">Receipt</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payments.map((payment) => (
                                        <tr key={payment.id} className="border-b last:border-0 hover:bg-muted/50">
                                            <td className="py-3 px-4">{payment.date}</td>
                                            <td className="py-3 px-4 font-semibold">KES {payment.amount.toLocaleString()}</td>
                                            <td className="py-3 px-4 font-mono text-sm">{payment.reference}</td>
                                            <td className="py-3 px-4">{payment.method}</td>
                                            <td className="py-3 px-4">{getStatusBadge(payment.status)}</td>
                                            <td className="py-3 px-4 text-right">
                                                {payment.status === "COMPLETED" && (
                                                    <Button variant="ghost" size="sm">
                                                        <Download className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
