"use client";

import Link from "next/link";
import { Users, Building2, CreditCard, FileText, TrendingUp, AlertCircle, ArrowRight, Activity } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { StatCard } from "@/components/dashboard/stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/auth-context";

export default function AdminDashboard() {
    const { user } = useAuth();

    // Mock system-wide stats
    const stats = {
        totalUsers: 156,
        totalProperties: 24,
        totalUnits: 248,
        occupancyRate: 87,
        monthlyRevenue: 15650000,
        pendingApplications: 23,
        activeLeases: 216,
        openMaintenance: 12,
    };

    // Mock system health
    const systemHealth = [
        { name: "Database", status: "healthy", uptime: "99.9%" },
        { name: "M-Pesa API", status: "healthy", uptime: "99.8%" },
        { name: "Email Service", status: "healthy", uptime: "100%" },
        { name: "File Storage", status: "healthy", uptime: "99.9%" },
    ];

    // Mock recent activities
    const recentActivities = [
        { id: 1, action: "New user registered", user: "Mary Wanjiku", time: "10 minutes ago" },
        { id: 2, action: "Payment received", details: "KES 95,000 from Peter Ochieng", time: "25 minutes ago" },
        { id: 3, action: "Application approved", details: "Unit A-205 - Jane Mwangi", time: "1 hour ago" },
        { id: 4, action: "Lease created", details: "Unit B-102 - New 1-year lease", time: "2 hours ago" },
        { id: 5, action: "Maintenance completed", details: "Request #124 resolved", time: "3 hours ago" },
    ];

    return (
        <div className="flex flex-col h-full">
            <DashboardHeader
                title="Admin Dashboard"
                description="System overview and management"
            />

            <div className="flex-1 p-6 space-y-6 overflow-auto">
                {/* Main Stats Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        title="Total Users"
                        value={stats.totalUsers}
                        icon={Users}
                        trend={{ value: 8, positive: true }}
                    />
                    <StatCard
                        title="Properties"
                        value={stats.totalProperties}
                        icon={Building2}
                        description={`${stats.totalUnits} total units`}
                    />
                    <StatCard
                        title="Monthly Revenue"
                        value={`KES ${(stats.monthlyRevenue / 1000000).toFixed(1)}M`}
                        icon={CreditCard}
                        trend={{ value: 15, positive: true }}
                    />
                    <StatCard
                        title="Occupancy Rate"
                        value={`${stats.occupancyRate}%`}
                        icon={TrendingUp}
                        description={`${stats.activeLeases} active leases`}
                    />
                </div>

                {/* Action Cards */}
                <div className="grid md:grid-cols-4 gap-4">
                    <Link href="/admin/applications">
                        <Card className="hover:shadow-md transition-shadow cursor-pointer border-amber-500/50 h-full">
                            <CardContent className="flex items-center gap-4 py-6">
                                <div className="p-3 bg-amber-500/10 rounded-lg">
                                    <AlertCircle className="h-6 w-6 text-amber-500" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold">{stats.pendingApplications}</h3>
                                    <p className="text-xs text-muted-foreground">Pending Applications</p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/admin/users">
                        <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                            <CardContent className="flex items-center gap-4 py-6">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                    <Users className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold">Manage Users</h3>
                                    <p className="text-xs text-muted-foreground">View & edit users</p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/admin/leases">
                        <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                            <CardContent className="flex items-center gap-4 py-6">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                    <FileText className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold">Manage Leases</h3>
                                    <p className="text-xs text-muted-foreground">Create & edit leases</p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/admin/reports">
                        <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                            <CardContent className="flex items-center gap-4 py-6">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                    <TrendingUp className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold">View Reports</h3>
                                    <p className="text-xs text-muted-foreground">Financial analytics</p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Recent Activity */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Recent Activity</CardTitle>
                            <Button variant="ghost" size="sm">View All</Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentActivities.map((activity) => (
                                    <div
                                        key={activity.id}
                                        className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0"
                                    >
                                        <div className="w-2 h-2 mt-2 rounded-full bg-primary" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">{activity.action}</p>
                                            {activity.user && <p className="text-xs text-muted-foreground">{activity.user}</p>}
                                            {activity.details && <p className="text-xs text-muted-foreground">{activity.details}</p>}
                                            <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* System Health */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="h-5 w-5 text-primary" />
                                System Health
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {systemHealth.map((service) => (
                                    <div
                                        key={service.name}
                                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "w-3 h-3 rounded-full",
                                                service.status === "healthy" ? "bg-green-500" : "bg-red-500"
                                            )} />
                                            <span className="font-medium">{service.name}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Badge variant="secondary">{service.uptime}</Badge>
                                            <Badge variant={service.status === "healthy" ? "success" : "destructive"}>
                                                {service.status}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function cn(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(" ");
}
