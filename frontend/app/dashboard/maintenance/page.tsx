"use client";

import { useState } from "react";
import { Plus, Wrench, Clock, CheckCircle, AlertTriangle, Eye } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

interface MaintenanceRequest {
    id: string;
    title: string;
    description: string;
    priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
    createdAt: string;
}

export default function MaintenancePage() {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "MEDIUM",
    });

    const requests: MaintenanceRequest[] = [
        {
            id: "1",
            title: "Leaking faucet in bathroom",
            description: "The bathroom sink faucet is dripping constantly.",
            priority: "MEDIUM",
            status: "IN_PROGRESS",
            createdAt: "Jan 28, 2026",
        },
        {
            id: "2",
            title: "AC not cooling properly",
            description: "Air conditioner makes noise but doesn't cool the room.",
            priority: "HIGH",
            status: "PENDING",
            createdAt: "Jan 25, 2026",
        },
        {
            id: "3",
            title: "Light bulb replacement",
            description: "Kitchen light bulb needs replacement.",
            priority: "LOW",
            status: "COMPLETED",
            createdAt: "Jan 15, 2026",
        },
    ];

    const getPriorityBadge = (priority: MaintenanceRequest["priority"]) => {
        const variants = {
            LOW: "secondary",
            MEDIUM: "default",
            HIGH: "destructive",
            URGENT: "destructive",
        } as const;
        return <Badge variant={variants[priority]}>{priority}</Badge>;
    };

    const getStatusIcon = (status: MaintenanceRequest["status"]) => {
        switch (status) {
            case "PENDING":
                return <Clock className="h-4 w-4 text-yellow-500" />;
            case "IN_PROGRESS":
                return <AlertTriangle className="h-4 w-4 text-blue-500" />;
            case "COMPLETED":
                return <CheckCircle className="h-4 w-4 text-green-500" />;
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Submit to API
        console.log("Submitting:", formData);
        setShowForm(false);
        setFormData({ title: "", description: "", priority: "MEDIUM" });
    };

    return (
        <div className="flex flex-col h-full">
            <DashboardHeader
                title="Maintenance Requests"
                description="Submit and track maintenance requests for your unit"
            />

            <div className="flex-1 p-6 space-y-6 overflow-auto">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <p className="text-3xl font-bold text-yellow-500">
                                {requests.filter((r) => r.status === "PENDING").length}
                            </p>
                            <p className="text-sm text-muted-foreground">Pending</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <p className="text-3xl font-bold text-blue-500">
                                {requests.filter((r) => r.status === "IN_PROGRESS").length}
                            </p>
                            <p className="text-sm text-muted-foreground">In Progress</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <p className="text-3xl font-bold text-green-500">
                                {requests.filter((r) => r.status === "COMPLETED").length}
                            </p>
                            <p className="text-sm text-muted-foreground">Completed</p>
                        </CardContent>
                    </Card>
                </div>

                {/* New Request Form */}
                {showForm ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>Submit New Request</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Issue Title</label>
                                    <Input
                                        placeholder="e.g., Leaking faucet, Broken AC"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Description</label>
                                    <textarea
                                        className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        placeholder="Please describe the issue in detail..."
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Priority</label>
                                    <Select
                                        value={formData.priority}
                                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                    >
                                        <option value="LOW">Low - Not urgent</option>
                                        <option value="MEDIUM">Medium - Needs attention</option>
                                        <option value="HIGH">High - Urgent</option>
                                        <option value="URGENT">Urgent - Emergency</option>
                                    </Select>
                                </div>
                                <div className="flex gap-3">
                                    <Button type="submit">Submit Request</Button>
                                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                ) : (
                    <Button onClick={() => setShowForm(true)}>
                        <Plus className="h-4 w-4 mr-2" /> New Request
                    </Button>
                )}

                {/* Requests List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Your Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {requests.map((request) => (
                                <div
                                    key={request.id}
                                    className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-primary/10 rounded-lg">
                                            <Wrench className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="font-semibold">{request.title}</p>
                                                {getPriorityBadge(request.priority)}
                                            </div>
                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {request.description}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-2">
                                                Submitted: {request.createdAt}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-2">
                                            {getStatusIcon(request.status)}
                                            <span className="text-sm">{request.status.replace("_", " ")}</span>
                                        </div>
                                        <Button variant="ghost" size="icon">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
