"use client";

import Link from "next/link";
import { Building2, DoorOpen, CreditCard, Users, TrendingUp, AlertCircle, ArrowRight, Plus } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { StatCard } from "@/components/dashboard/stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/auth-context";

export default function LandlordDashboard() {
    const { user } = useAuth();

    // Mock data for landlord stats
    const stats = {
        totalProperties: 5,
        totalUnits: 24,
        occupiedUnits: 20,
        vacantUnits: 4,
        monthlyIncome: 1280000,
        pendingApplications: 8,
        openMaintenanceRequests: 3,
    };

    const occupancyRate = Math.round((stats.occupiedUnits / stats.totalUnits) * 100);

    // Mock recent activities
    const recentActivities = [
        { id: 1, type: "application", message: "New application for Kileleshwa Heights A-205", time: "2 hours ago" },
        { id: 2, type: "payment", message: "Rent received from Tenant John Doe - KES 65,000", time: "5 hours ago" },
        { id: 3, type: "maintenance", message: "Maintenance request #124 marked as completed", time: "1 day ago" },
        { id: 4, type: "lease", message: "Lease for Unit B-103 expires in 30 days", time: "2 days ago" },
    ];

    return (
        <div className="flex flex-col h-full">
            <DashboardHeader
                title={`Welcome, ${user?.firstName || "Landlord"}`}
                description="Manage your properties and track performance"
            />

            <div className="flex-1 p-6 space-y-6 overflow-auto">
                {/* Stats Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        title="Total Properties"
                        value={stats.totalProperties}
                        icon={Building2}
                        description={`${stats.totalUnits} total units`}
                    />
                    <StatCard
                        title="Occupancy Rate"
                        value={`${occupancyRate}%`}
                        icon={Users}
                        description={`${stats.occupiedUnits} occupied, ${stats.vacantUnits} vacant`}
                    />
                    <StatCard
                        title="Monthly Income"
                        value={`KES ${stats.monthlyIncome.toLocaleString()}`}
                        icon={CreditCard}
                        trend={{ value: 12, positive: true }}
                    />
                    <StatCard
                        title="Pending Applications"
                        value={stats.pendingApplications}
                        icon={TrendingUp}
                        description="Awaiting review"
                    />
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-3 gap-4">
                    <Link href="/landlord/properties">
                        <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                            <CardContent className="flex items-center gap-4 py-6">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                    <Building2 className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold">Manage Properties</h3>
                                    <p className="text-sm text-muted-foreground">Add, edit, or remove properties</p>
                                </div>
                                <ArrowRight className="h-5 w-5 text-muted-foreground" />
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/landlord/units">
                        <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                            <CardContent className="flex items-center gap-4 py-6">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                    <DoorOpen className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold">Manage Units</h3>
                                    <p className="text-sm text-muted-foreground">View and update unit listings</p>
                                </div>
                                <ArrowRight className="h-5 w-5 text-muted-foreground" />
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/landlord/applications">
                        <Card className="hover:shadow-md transition-shadow cursor-pointer h-full border-amber-500/50">
                            <CardContent className="flex items-center gap-4 py-6">
                                <div className="p-3 bg-amber-500/10 rounded-lg">
                                    <AlertCircle className="h-6 w-6 text-amber-500" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold">Review Applications</h3>
                                    <p className="text-sm text-muted-foreground">{stats.pendingApplications} pending reviews</p>
                                </div>
                                <Badge variant="secondary">{stats.pendingApplications}</Badge>
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
                                            <p className="text-sm">{activity.message}</p>
                                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Vacant Units */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Vacant Units</CardTitle>
                            <Button size="sm">
                                <Plus className="h-4 w-4 mr-2" /> Add Unit
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {[
                                    { unit: "A-205", property: "Kileleshwa Heights", rent: 65000 },
                                    { unit: "B-107", property: "Westlands Prime", rent: 85000 },
                                    { unit: "C-301", property: "Lavington Gardens", rent: 95000 },
                                    { unit: "A-102", property: "Kileleshwa Heights", rent: 55000 },
                                ].map((unit, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                                    >
                                        <div>
                                            <p className="font-semibold text-sm">{unit.unit}</p>
                                            <p className="text-xs text-muted-foreground">{unit.property}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-sm">KES {unit.rent.toLocaleString()}</p>
                                            <Badge variant="outline" className="text-xs">Vacant</Badge>
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
