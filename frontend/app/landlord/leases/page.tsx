"use client";

import { FileText, Calendar, User, Building2, Eye } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { useState } from "react";

interface Lease {
    id: string;
    tenant: string;
    unitNumber: string;
    propertyName: string;
    startDate: string;
    endDate: string;
    monthlyRent: number;
    status: "ACTIVE" | "EXPIRING_SOON" | "EXPIRED";
}

export default function LeasesPage() {
    const [filter, setFilter] = useState("all");

    const leases: Lease[] = [
        { id: "1", tenant: "John Doe", unitNumber: "A-201", propertyName: "Kileleshwa Heights", startDate: "Jan 1, 2026", endDate: "Dec 31, 2026", monthlyRent: 65000, status: "ACTIVE" },
        { id: "2", tenant: "Jane Mwangi", unitNumber: "A-203", propertyName: "Kileleshwa Heights", startDate: "Mar 1, 2025", endDate: "Feb 28, 2026", monthlyRent: 30000, status: "EXPIRING_SOON" },
        { id: "3", tenant: "Peter Ochieng", unitNumber: "B-101", propertyName: "Westlands Prime", startDate: "Jun 1, 2025", endDate: "May 31, 2026", monthlyRent: 95000, status: "ACTIVE" },
        { id: "4", tenant: "Mary Wanjiku", unitNumber: "B-104", propertyName: "Westlands Prime", startDate: "Jan 1, 2025", endDate: "Dec 31, 2025", monthlyRent: 75000, status: "EXPIRED" },
    ];

    const filteredLeases = filter === "all" ? leases : leases.filter((l) => l.status === filter);

    const getStatusBadge = (status: Lease["status"]) => {
        switch (status) {
            case "ACTIVE":
                return <Badge variant="success">Active</Badge>;
            case "EXPIRING_SOON":
                return <Badge variant="secondary" className="bg-amber-100 text-amber-800">Expiring Soon</Badge>;
            case "EXPIRED":
                return <Badge variant="destructive">Expired</Badge>;
        }
    };

    return (
        <div className="flex flex-col h-full">
            <DashboardHeader
                title="Leases"
                description="View all tenant leases (read-only)"
            />

            <div className="flex-1 p-6 space-y-6 overflow-auto">
                {/* Stats */}
                <div className="grid grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <p className="text-3xl font-bold">{leases.length}</p>
                            <p className="text-sm text-muted-foreground">Total Leases</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <p className="text-3xl font-bold text-green-500">{leases.filter((l) => l.status === "ACTIVE").length}</p>
                            <p className="text-sm text-muted-foreground">Active</p>
                        </CardContent>
                    </Card>
                    <Card className="border-amber-500/50">
                        <CardContent className="pt-6 text-center">
                            <p className="text-3xl font-bold text-amber-500">{leases.filter((l) => l.status === "EXPIRING_SOON").length}</p>
                            <p className="text-sm text-muted-foreground">Expiring Soon</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <p className="text-3xl font-bold text-primary">
                                KES {leases.filter((l) => l.status === "ACTIVE").reduce((acc, l) => acc + l.monthlyRent, 0).toLocaleString()}
                            </p>
                            <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filter */}
                <Select value={filter} onChange={(e) => setFilter(e.target.value)} className="w-48">
                    <option value="all">All Leases</option>
                    <option value="ACTIVE">Active</option>
                    <option value="EXPIRING_SOON">Expiring Soon</option>
                    <option value="EXPIRED">Expired</option>
                </Select>

                {/* Leases Table */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-3 px-4 font-medium">Tenant</th>
                                        <th className="text-left py-3 px-4 font-medium">Unit</th>
                                        <th className="text-left py-3 px-4 font-medium">Property</th>
                                        <th className="text-left py-3 px-4 font-medium">Period</th>
                                        <th className="text-left py-3 px-4 font-medium">Rent</th>
                                        <th className="text-left py-3 px-4 font-medium">Status</th>
                                        <th className="text-right py-3 px-4 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredLeases.map((lease) => (
                                        <tr key={lease.id} className="border-b last:border-0 hover:bg-muted/50">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2">
                                                    <User className="h-4 w-4 text-muted-foreground" />
                                                    <span className="font-semibold">{lease.tenant}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">{lease.unitNumber}</td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-1 text-muted-foreground">
                                                    <Building2 className="h-3 w-3" />
                                                    {lease.propertyName}
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-1 text-sm">
                                                    <Calendar className="h-3 w-3 text-muted-foreground" />
                                                    {lease.startDate} - {lease.endDate}
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 font-semibold">KES {lease.monthlyRent.toLocaleString()}</td>
                                            <td className="py-3 px-4">{getStatusBadge(lease.status)}</td>
                                            <td className="py-3 px-4 text-right">
                                                <Button variant="ghost" size="sm">
                                                    <Eye className="h-4 w-4 mr-1" /> View
                                                </Button>
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
