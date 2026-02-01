"use client";

import { useState } from "react";
import { Plus, FileText, Clock, CheckCircle, XCircle, Eye } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Application {
    id: string;
    propertyName: string;
    unitNumber: string;
    submittedAt: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    message?: string;
}

export default function ApplicationsPage() {
    const [applications, setApplications] = useState<Application[]>([
        {
            id: "1",
            propertyName: "Kileleshwa Heights",
            unitNumber: "A-201",
            submittedAt: "Jan 15, 2026",
            status: "PENDING",
            message: "Looking forward to moving in!",
        },
        {
            id: "2",
            propertyName: "Westlands Prime",
            unitNumber: "B-105",
            submittedAt: "Jan 10, 2026",
            status: "APPROVED",
        },
        {
            id: "3",
            propertyName: "Lavington Gardens",
            unitNumber: "C-302",
            submittedAt: "Dec 20, 2025",
            status: "REJECTED",
        },
    ]);

    const getStatusBadge = (status: Application["status"]) => {
        switch (status) {
            case "PENDING":
                return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
            case "APPROVED":
                return <Badge variant="success"><CheckCircle className="h-3 w-3 mr-1" /> Approved</Badge>;
            case "REJECTED":
                return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Rejected</Badge>;
        }
    };

    return (
        <div className="flex flex-col h-full">
            <DashboardHeader
                title="My Applications"
                description="Track your rental application submissions"
            />

            <div className="flex-1 p-6 space-y-6 overflow-auto">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <p className="text-3xl font-bold text-primary">
                                    {applications.filter((a) => a.status === "PENDING").length}
                                </p>
                                <p className="text-sm text-muted-foreground">Pending</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <p className="text-3xl font-bold text-green-500">
                                    {applications.filter((a) => a.status === "APPROVED").length}
                                </p>
                                <p className="text-sm text-muted-foreground">Approved</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <p className="text-3xl font-bold text-red-500">
                                    {applications.filter((a) => a.status === "REJECTED").length}
                                </p>
                                <p className="text-sm text-muted-foreground">Rejected</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Applications List */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>All Applications</CardTitle>
                        <Button size="sm">
                            <Plus className="h-4 w-4 mr-2" /> New Application
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {applications.map((app) => (
                                <div
                                    key={app.id}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-primary/10 rounded-lg">
                                            <FileText className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">{app.propertyName}</p>
                                            <p className="text-sm text-muted-foreground">
                                                Unit {app.unitNumber} • Submitted {app.submittedAt}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {getStatusBadge(app.status)}
                                        <Button variant="ghost" size="icon">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}

                            {applications.length === 0 && (
                                <div className="text-center py-12">
                                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-muted-foreground">No applications yet.</p>
                                    <Button className="mt-4">
                                        <Plus className="h-4 w-4 mr-2" /> Submit Application
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
