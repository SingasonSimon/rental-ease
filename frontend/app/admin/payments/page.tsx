"use client";

import { useState } from "react";
import { CreditCard, Download, CheckCircle, Clock, XCircle, RefreshCw, Search, TrendingUp } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface Payment {
    id: string;
    tenant: string;
    unitNumber: string;
    propertyName: string;
    landlord: string;
    amount: number;
    date: string;
    status: "COMPLETED" | "PENDING" | "FAILED";
    reference: string;
    method: "MPESA";
}

export default function PaymentsPage() {
    const [filter, setFilter] = useState({ status: "all", search: "" });

    const payments: Payment[] = [
        { id: "1", tenant: "John Doe", unitNumber: "A-201", propertyName: "Kileleshwa Heights", landlord: "John Kamau Properties", amount: 65000, date: "Feb 1, 2026 10:30 AM", status: "COMPLETED", reference: "MPE12345ABC", method: "MPESA" },
        { id: "2", tenant: "Jane Mwangi", unitNumber: "A-203", propertyName: "Kileleshwa Heights", landlord: "John Kamau Properties", amount: 30000, date: "Feb 1, 2026 09:15 AM", status: "PENDING", reference: "MPE12346DEF", method: "MPESA" },
        { id: "3", tenant: "Peter Ochieng", unitNumber: "B-101", propertyName: "Westlands Prime", landlord: "Grace Properties", amount: 95000, date: "Jan 31, 2026 02:45 PM", status: "COMPLETED", reference: "MPE12344XYZ", method: "MPESA" },
        { id: "4", tenant: "Samuel Njoroge", unitNumber: "A-105", propertyName: "Kileleshwa Heights", landlord: "John Kamau Properties", amount: 50000, date: "Jan 30, 2026 11:20 AM", status: "FAILED", reference: "MPE12343GHI", method: "MPESA" },
        { id: "5", tenant: "John Doe", unitNumber: "A-201", propertyName: "Kileleshwa Heights", landlord: "John Kamau Properties", amount: 65000, date: "Jan 5, 2026 10:00 AM", status: "COMPLETED", reference: "MPE12342JKL", method: "MPESA" },
        { id: "6", tenant: "Peter Ochieng", unitNumber: "B-101", propertyName: "Westlands Prime", landlord: "Grace Properties", amount: 95000, date: "Jan 5, 2026 09:30 AM", status: "COMPLETED", reference: "MPE12341MNO", method: "MPESA" },
    ];

    const totalCollected = payments.filter((p) => p.status === "COMPLETED").reduce((acc, p) => acc + p.amount, 0);
    const pendingAmount = payments.filter((p) => p.status === "PENDING").reduce((acc, p) => acc + p.amount, 0);
    const failedAmount = payments.filter((p) => p.status === "FAILED").reduce((acc, p) => acc + p.amount, 0);

    const filteredPayments = payments.filter((p) => {
        if (filter.status !== "all" && p.status !== filter.status) return false;
        if (filter.search) {
            const search = filter.search.toLowerCase();
            if (!p.tenant.toLowerCase().includes(search) && !p.reference.toLowerCase().includes(search)) {
                return false;
            }
        }
        return true;
    });

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

    const handleRetry = (id: string) => {
        console.log("Retrying payment:", id);
    };

    return (
        <div className="flex flex-col h-full">
            <DashboardHeader
                title="Payment Processing"
                description="View and manage all M-Pesa payments"
            />

            <div className="flex-1 p-6 space-y-6 overflow-auto">
                {/* Stats */}
                <div className="grid md:grid-cols-4 gap-4">
                    <Card className="border-green-500/50">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Collected</p>
                                    <p className="text-2xl font-bold text-green-600">KES {totalCollected.toLocaleString()}</p>
                                </div>
                                <div className="p-3 bg-green-500/10 rounded-full">
                                    <CreditCard className="h-6 w-6 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-amber-500/50">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Pending</p>
                                    <p className="text-2xl font-bold text-amber-600">KES {pendingAmount.toLocaleString()}</p>
                                </div>
                                <div className="p-3 bg-amber-500/10 rounded-full">
                                    <Clock className="h-6 w-6 text-amber-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-red-500/50">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Failed</p>
                                    <p className="text-2xl font-bold text-red-600">KES {failedAmount.toLocaleString()}</p>
                                </div>
                                <div className="p-3 bg-red-500/10 rounded-full">
                                    <XCircle className="h-6 w-6 text-red-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">This Month</p>
                                    <p className="text-2xl font-bold">+18%</p>
                                </div>
                                <div className="p-3 bg-primary/10 rounded-full">
                                    <TrendingUp className="h-6 w-6 text-primary" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by tenant or reference..."
                            className="pl-9"
                            value={filter.search}
                            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                        />
                    </div>
                    <Select
                        value={filter.status}
                        onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                        className="w-40"
                    >
                        <option value="all">All Status</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="PENDING">Pending</option>
                        <option value="FAILED">Failed</option>
                    </Select>
                    <Input type="month" className="w-48" />
                    <div className="flex-1" />
                    <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" /> Export Report
                    </Button>
                </div>

                {/* Payments Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Payment Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-3 px-4 font-medium">Tenant</th>
                                        <th className="text-left py-3 px-4 font-medium">Unit</th>
                                        <th className="text-left py-3 px-4 font-medium">Landlord</th>
                                        <th className="text-left py-3 px-4 font-medium">Amount</th>
                                        <th className="text-left py-3 px-4 font-medium">Date</th>
                                        <th className="text-left py-3 px-4 font-medium">Reference</th>
                                        <th className="text-left py-3 px-4 font-medium">Status</th>
                                        <th className="text-right py-3 px-4 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPayments.map((payment) => (
                                        <tr key={payment.id} className="border-b last:border-0 hover:bg-muted/50">
                                            <td className="py-3 px-4 font-semibold">{payment.tenant}</td>
                                            <td className="py-3 px-4">
                                                <div>
                                                    <span>{payment.unitNumber}</span>
                                                    <p className="text-xs text-muted-foreground">{payment.propertyName}</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-muted-foreground">{payment.landlord}</td>
                                            <td className="py-3 px-4 font-semibold">KES {payment.amount.toLocaleString()}</td>
                                            <td className="py-3 px-4 text-sm">{payment.date}</td>
                                            <td className="py-3 px-4 font-mono text-sm">{payment.reference}</td>
                                            <td className="py-3 px-4">{getStatusBadge(payment.status)}</td>
                                            <td className="py-3 px-4 text-right">
                                                <div className="flex justify-end gap-1">
                                                    {payment.status === "COMPLETED" && (
                                                        <Button variant="ghost" size="sm">
                                                            <Download className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                    {payment.status === "FAILED" && (
                                                        <Button variant="outline" size="sm" onClick={() => handleRetry(payment.id)}>
                                                            <RefreshCw className="h-4 w-4 mr-1" /> Retry
                                                        </Button>
                                                    )}
                                                </div>
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
