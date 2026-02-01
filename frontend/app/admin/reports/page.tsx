"use client";

import { useState } from "react";
import { BarChart3, TrendingUp, PieChart, Download, Calendar, DollarSign } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select } from "@/components/ui/select";

export default function ReportsPage() {
    const [period, setPeriod] = useState("month");

    // Mock financial data
    const financialData = {
        totalRevenue: 15650000,
        collectedRent: 14200000,
        pendingRent: 1450000,
        occupancyRate: 87,
        avgRent: 72000,
        topProperties: [
            { name: "Westlands Prime", revenue: 5500000, units: 8 },
            { name: "Kileleshwa Heights", revenue: 4800000, units: 12 },
            { name: "Lavington Gardens", revenue: 3200000, units: 6 },
        ],
        monthlyTrend: [
            { month: "Sep 2025", revenue: 12500000 },
            { month: "Oct 2025", revenue: 13200000 },
            { month: "Nov 2025", revenue: 14100000 },
            { month: "Dec 2025", revenue: 14800000 },
            { month: "Jan 2026", revenue: 15650000 },
        ],
    };

    return (
        <div className="flex flex-col h-full">
            <DashboardHeader
                title="Financial Reports"
                description="Analytics and insights for the rental system"
            />

            <div className="flex-1 p-6 space-y-6 overflow-auto">
                {/* Controls */}
                <div className="flex items-center gap-4">
                    <Select value={period} onChange={(e) => setPeriod(e.target.value)} className="w-48">
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="quarter">This Quarter</option>
                        <option value="year">This Year</option>
                    </Select>
                    <div className="flex-1" />
                    <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" /> Export PDF
                    </Button>
                    <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" /> Export Excel
                    </Button>
                </div>

                {/* Key Metrics */}
                <div className="grid md:grid-cols-4 gap-4">
                    <Card className="border-green-500/50">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                                    <p className="text-2xl font-bold text-green-600">KES {(financialData.totalRevenue / 1000000).toFixed(2)}M</p>
                                    <p className="text-xs text-green-600">+18% from last month</p>
                                </div>
                                <div className="p-3 bg-green-500/10 rounded-full">
                                    <DollarSign className="h-6 w-6 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Collected Rent</p>
                                    <p className="text-2xl font-bold">KES {(financialData.collectedRent / 1000000).toFixed(2)}M</p>
                                    <p className="text-xs text-muted-foreground">90.7% collection rate</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-amber-500/50">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Pending Rent</p>
                                    <p className="text-2xl font-bold text-amber-600">KES {(financialData.pendingRent / 1000000).toFixed(2)}M</p>
                                    <p className="text-xs text-amber-600">12 tenants overdue</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Avg. Rent</p>
                                    <p className="text-2xl font-bold">KES {financialData.avgRent.toLocaleString()}</p>
                                    <p className="text-xs text-muted-foreground">Per unit/month</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Revenue Trend */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-primary" />
                                Revenue Trend
                            </CardTitle>
                            <CardDescription>Monthly revenue over the last 5 months</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {financialData.monthlyTrend.map((data, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>{data.month}</span>
                                            <span className="font-semibold">KES {(data.revenue / 1000000).toFixed(2)}M</span>
                                        </div>
                                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary rounded-full transition-all"
                                                style={{ width: `${(data.revenue / 16000000) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Top Properties */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="h-5 w-5 text-primary" />
                                Top Performing Properties
                            </CardTitle>
                            <CardDescription>Revenue by property this month</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {financialData.topProperties.map((property, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                                        <div>
                                            <p className="font-semibold">{property.name}</p>
                                            <p className="text-sm text-muted-foreground">{property.units} units</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-lg">KES {(property.revenue / 1000000).toFixed(2)}M</p>
                                            <p className="text-xs text-muted-foreground">
                                                {((property.revenue / financialData.totalRevenue) * 100).toFixed(1)}% of total
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Occupancy Summary */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <PieChart className="h-5 w-5 text-primary" />
                            Occupancy Summary
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center p-6 bg-green-500/10 rounded-lg">
                                <p className="text-4xl font-bold text-green-600">{financialData.occupancyRate}%</p>
                                <p className="text-sm text-muted-foreground mt-2">Overall Occupancy</p>
                            </div>
                            <div className="text-center p-6 bg-muted/50 rounded-lg">
                                <p className="text-4xl font-bold">216</p>
                                <p className="text-sm text-muted-foreground mt-2">Occupied Units</p>
                            </div>
                            <div className="text-center p-6 bg-amber-500/10 rounded-lg">
                                <p className="text-4xl font-bold text-amber-600">32</p>
                                <p className="text-sm text-muted-foreground mt-2">Vacant Units</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
