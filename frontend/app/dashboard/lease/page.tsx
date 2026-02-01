"use client";

import { Download, Calendar, MapPin, Home, FileText, User } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LeasePage() {
    // Mock lease data
    const lease = {
        id: "LEASE-2026-001",
        status: "ACTIVE",
        property: {
            name: "Kileleshwa Heights",
            address: "Othaya Road, Kileleshwa, Nairobi",
            unit: "A-201",
        },
        landlord: {
            name: "John Kamau Properties",
            email: "landlord@example.com",
            phone: "+254 700 123 456",
        },
        terms: {
            startDate: "Jan 1, 2026",
            endDate: "Dec 31, 2026",
            monthlyRent: 65000,
            deposit: 130000,
            paymentDueDay: 5,
        },
    };

    return (
        <div className="flex flex-col h-full">
            <DashboardHeader
                title="My Lease"
                description="View your current lease agreement details"
            />

            <div className="flex-1 p-6 space-y-6 overflow-auto">
                {/* Lease Status Banner */}
                <Card className="border-green-500/50 bg-green-50 dark:bg-green-950/20">
                    <CardContent className="flex items-center justify-between py-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-500/20 rounded-lg">
                                <FileText className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="font-semibold text-green-800 dark:text-green-200">
                                    Active Lease
                                </p>
                                <p className="text-sm text-green-700 dark:text-green-300">
                                    Lease ID: {lease.id}
                                </p>
                            </div>
                        </div>
                        <Badge variant="success">Active</Badge>
                    </CardContent>
                </Card>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Property Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Home className="h-5 w-5 text-primary" />
                                Property Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Property Name</p>
                                <p className="font-semibold">{lease.property.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Unit Number</p>
                                <p className="font-semibold">{lease.property.unit}</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Address</p>
                                    <p className="font-semibold">{lease.property.address}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Landlord Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5 text-primary" />
                                Landlord Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Name</p>
                                <p className="font-semibold">{lease.landlord.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Email</p>
                                <p className="font-semibold">{lease.landlord.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Phone</p>
                                <p className="font-semibold">{lease.landlord.phone}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Lease Terms */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-primary" />
                                Lease Terms
                            </CardTitle>
                            <CardDescription>Financial and duration details of your lease</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="p-4 bg-muted/50 rounded-lg">
                                    <p className="text-sm text-muted-foreground">Start Date</p>
                                    <p className="text-lg font-semibold">{lease.terms.startDate}</p>
                                </div>
                                <div className="p-4 bg-muted/50 rounded-lg">
                                    <p className="text-sm text-muted-foreground">End Date</p>
                                    <p className="text-lg font-semibold">{lease.terms.endDate}</p>
                                </div>
                                <div className="p-4 bg-muted/50 rounded-lg">
                                    <p className="text-sm text-muted-foreground">Monthly Rent</p>
                                    <p className="text-lg font-semibold">KES {lease.terms.monthlyRent.toLocaleString()}</p>
                                </div>
                                <div className="p-4 bg-muted/50 rounded-lg">
                                    <p className="text-sm text-muted-foreground">Security Deposit</p>
                                    <p className="text-lg font-semibold">KES {lease.terms.deposit.toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="mt-6 p-4 border rounded-lg">
                                <p className="text-sm text-muted-foreground mb-2">Payment Due Date</p>
                                <p className="font-semibold">
                                    Rent is due by the {lease.terms.paymentDueDay}th of each month
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                    <Button>
                        <Download className="h-4 w-4 mr-2" /> Download Lease Agreement
                    </Button>
                    <Button variant="outline">Request Lease Renewal</Button>
                </div>
            </div>
        </div>
    );
}
