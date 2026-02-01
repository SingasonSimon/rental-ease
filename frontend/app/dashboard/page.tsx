"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CreditCard, FileText, Wrench, MessageSquare, ArrowRight, Calendar, AlertCircle } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { StatCard } from "@/components/dashboard/stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/auth-context";

export default function TenantDashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        rentDue: 65000,
        dueDate: "Feb 5, 2026",
        leaseEnds: "Dec 31, 2026",
        maintenanceRequests: 2,
        unreadMessages: 3,
    });

    // Mock recent activities
    const recentActivities = [
        { id: 1, type: "payment", message: "Payment of KES 65,000 received", date: "Jan 5, 2026" },
        { id: 2, type: "maintenance", message: "Maintenance request #123 resolved", date: "Jan 3, 2026" },
        { id: 3, type: "message", message: "New message from Property Manager", date: "Jan 2, 2026" },
    ];

    return (
        <div className="flex flex-col h-full">
            <DashboardHeader
                title={`Welcome back, ${user?.firstName || "Tenant"}`}
                description="Here's an overview of your rental account"
            />

            <div className="flex-1 p-6 space-y-6 overflow-auto">
                {/* Stats Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        title="Rent Due"
                        value={`KES ${stats.rentDue.toLocaleString()}`}
                        icon={CreditCard}
                        description={`Due by ${stats.dueDate}`}
                    />
                    <StatCard
                        title="Lease Ends"
                        value={stats.leaseEnds}
                        icon={Calendar}
                        description="Current lease term"
                    />
                    <StatCard
                        title="Open Requests"
                        value={stats.maintenanceRequests}
                        icon={Wrench}
                        description="Maintenance pending"
                    />
                    <StatCard
                        title="Messages"
                        value={stats.unreadMessages}
                        icon={MessageSquare}
                        description="Unread messages"
                    />
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-3 gap-4">
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <CreditCard className="h-5 w-5 text-primary" />
                                Pay Rent
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                                Make your monthly rent payment securely via M-Pesa.
                            </p>
                            <Link href="/dashboard/payments">
                                <Button className="w-full">
                                    Pay Now <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Wrench className="h-5 w-5 text-primary" />
                                Maintenance
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                                Report an issue or track existing requests.
                            </p>
                            <Link href="/dashboard/maintenance">
                                <Button variant="outline" className="w-full">
                                    Submit Request <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <FileText className="h-5 w-5 text-primary" />
                                Lease Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                                View your lease agreement and terms.
                            </p>
                            <Link href="/dashboard/lease">
                                <Button variant="outline" className="w-full">
                                    View Lease <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivities.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="flex items-center justify-between py-3 border-b last:border-0"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                            {activity.type === "payment" && <CreditCard className="h-4 w-4 text-primary" />}
                                            {activity.type === "maintenance" && <Wrench className="h-4 w-4 text-primary" />}
                                            {activity.type === "message" && <MessageSquare className="h-4 w-4 text-primary" />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">{activity.message}</p>
                                            <p className="text-xs text-muted-foreground">{activity.date}</p>
                                        </div>
                                    </div>
                                    <Badge variant="secondary">{activity.type}</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Rent Reminder Alert */}
                {stats.rentDue > 0 && (
                    <Card className="border-amber-500/50 bg-amber-50 dark:bg-amber-950/20">
                        <CardContent className="flex items-center gap-4 py-4">
                            <AlertCircle className="h-8 w-8 text-amber-500" />
                            <div className="flex-1">
                                <p className="font-semibold text-amber-800 dark:text-amber-200">
                                    Rent Payment Reminder
                                </p>
                                <p className="text-sm text-amber-700 dark:text-amber-300">
                                    Your rent of KES {stats.rentDue.toLocaleString()} is due on {stats.dueDate}. Pay on time to avoid late fees.
                                </p>
                            </div>
                            <Link href="/dashboard/payments">
                                <Button>Pay Now</Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
