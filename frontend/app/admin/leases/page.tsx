"use client";

import { useState } from "react";
import { FileText, Plus, Edit, Eye, User, Building2, Calendar, DoorOpen } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

interface Lease {
    id: string;
    tenant: string;
    tenantEmail: string;
    unitNumber: string;
    propertyName: string;
    landlord: string;
    startDate: string;
    endDate: string;
    monthlyRent: number;
    deposit: number;
    status: "ACTIVE" | "EXPIRING_SOON" | "EXPIRED" | "TERMINATED";
}

export default function LeasesPage() {
    const [showForm, setShowForm] = useState(false);
    const [filter, setFilter] = useState("all");

    const leases: Lease[] = [
        { id: "1", tenant: "John Doe", tenantEmail: "john@example.com", unitNumber: "A-201", propertyName: "Kileleshwa Heights", landlord: "John Kamau Properties", startDate: "Jan 1, 2026", endDate: "Dec 31, 2026", monthlyRent: 65000, deposit: 130000, status: "ACTIVE" },
        { id: "2", tenant: "Jane Mwangi", tenantEmail: "jane@example.com", unitNumber: "A-203", propertyName: "Kileleshwa Heights", landlord: "John Kamau Properties", startDate: "Mar 1, 2025", endDate: "Feb 28, 2026", monthlyRent: 30000, deposit: 60000, status: "EXPIRING_SOON" },
        { id: "3", tenant: "Peter Ochieng", tenantEmail: "peter@example.com", unitNumber: "B-101", propertyName: "Westlands Prime", landlord: "Grace Properties", startDate: "Jun 1, 2025", endDate: "May 31, 2026", monthlyRent: 95000, deposit: 190000, status: "ACTIVE" },
        { id: "4", tenant: "Mary Wanjiku", tenantEmail: "mary@example.com", unitNumber: "B-104", propertyName: "Westlands Prime", landlord: "Grace Properties", startDate: "Jan 1, 2025", endDate: "Dec 31, 2025", monthlyRent: 75000, deposit: 150000, status: "EXPIRED" },
    ];

    const filteredLeases = filter === "all" ? leases : leases.filter((l) => l.status === filter);

    const getStatusBadge = (status: Lease["status"]) => {
        switch (status) {
            case "ACTIVE":
                return <Badge variant="success">Active</Badge>;
            case "EXPIRING_SOON":
                return <Badge className="bg-amber-100 text-amber-800">Expiring Soon</Badge>;
            case "EXPIRED":
                return <Badge variant="destructive">Expired</Badge>;
            case "TERMINATED":
                return <Badge variant="secondary">Terminated</Badge>;
        }
    };

    return (
        <div className="flex flex-col h-full">
            <DashboardHeader
                title="Lease Management"
                description="Create and manage tenant leases"
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

                {/* Filter & Actions */}
                <div className="flex items-center gap-4">
                    <Select value={filter} onChange={(e) => setFilter(e.target.value)} className="w-48">
                        <option value="all">All Leases</option>
                        <option value="ACTIVE">Active</option>
                        <option value="EXPIRING_SOON">Expiring Soon</option>
                        <option value="EXPIRED">Expired</option>
                        <option value="TERMINATED">Terminated</option>
                    </Select>
                    <div className="flex-1" />
                    <Button onClick={() => setShowForm(true)}>
                        <Plus className="h-4 w-4 mr-2" /> Create Lease
                    </Button>
                </div>

                {/* Create Lease Form */}
                {showForm && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Create New Lease</CardTitle>
                            <CardDescription>Create a lease agreement for a tenant</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Tenant (User)</label>
                                        <Select>
                                            <option>Select tenant...</option>
                                            <option>John Doe (john@example.com)</option>
                                            <option>Jane Mwangi (jane@example.com)</option>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Unit</label>
                                        <Select>
                                            <option>Select unit...</option>
                                            <option>A-202 - Kileleshwa Heights (Vacant)</option>
                                            <option>B-102 - Westlands Prime (Vacant)</option>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Start Date</label>
                                        <Input type="date" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">End Date</label>
                                        <Input type="date" />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Monthly Rent (KES)</label>
                                        <Input type="number" placeholder="65000" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Security Deposit (KES)</label>
                                        <Input type="number" placeholder="130000" />
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Button type="submit">Create Lease</Button>
                                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

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
                                                    <div>
                                                        <span className="font-semibold">{lease.tenant}</span>
                                                        <p className="text-xs text-muted-foreground">{lease.tenantEmail}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-1">
                                                    <DoorOpen className="h-3 w-3 text-muted-foreground" />
                                                    {lease.unitNumber}
                                                </div>
                                            </td>
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
                                                <div className="flex justify-end gap-1">
                                                    <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                                                    <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
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
