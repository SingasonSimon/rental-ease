"use client";

import { useState } from "react";
import { Wrench, Clock, CheckCircle, AlertTriangle, Eye, User, MessageSquare } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";

interface MaintenanceRequest {
    id: string;
    title: string;
    description: string;
    tenant: string;
    unitNumber: string;
    propertyName: string;
    priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
    createdAt: string;
}

export default function MaintenancePage() {
    const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);
    const [filter, setFilter] = useState({ status: "all", priority: "all" });

    const requests: MaintenanceRequest[] = [
        { id: "1", title: "Leaking faucet in bathroom", description: "The bathroom sink faucet is dripping constantly, wasting water.", tenant: "John Doe", unitNumber: "A-201", propertyName: "Kileleshwa Heights", priority: "MEDIUM", status: "IN_PROGRESS", createdAt: "Jan 28, 2026" },
        { id: "2", title: "AC not cooling properly", description: "Air conditioner makes noise but doesn't cool the room effectively.", tenant: "Peter Ochieng", unitNumber: "B-101", propertyName: "Westlands Prime", priority: "HIGH", status: "PENDING", createdAt: "Jan 27, 2026" },
        { id: "3", title: "Broken door lock", description: "Front door lock is broken, security concern.", tenant: "Jane Mwangi", unitNumber: "A-203", propertyName: "Kileleshwa Heights", priority: "URGENT", status: "PENDING", createdAt: "Jan 29, 2026" },
        { id: "4", title: "Light bulb replacement", description: "Kitchen light bulb needs replacement.", tenant: "John Doe", unitNumber: "A-201", propertyName: "Kileleshwa Heights", priority: "LOW", status: "COMPLETED", createdAt: "Jan 15, 2026" },
    ];

    const filteredRequests = requests.filter((r) => {
        if (filter.status !== "all" && r.status !== filter.status) return false;
        if (filter.priority !== "all" && r.priority !== filter.priority) return false;
        return true;
    });

    const getPriorityBadge = (priority: MaintenanceRequest["priority"]) => {
        const styles = {
            LOW: "bg-gray-100 text-gray-800",
            MEDIUM: "bg-blue-100 text-blue-800",
            HIGH: "bg-orange-100 text-orange-800",
            URGENT: "bg-red-100 text-red-800",
        };
        return <Badge className={styles[priority]}>{priority}</Badge>;
    };

    const getStatusIcon = (status: MaintenanceRequest["status"]) => {
        switch (status) {
            case "PENDING":
                return <Clock className="h-4 w-4 text-amber-500" />;
            case "IN_PROGRESS":
                return <AlertTriangle className="h-4 w-4 text-blue-500" />;
            case "COMPLETED":
                return <CheckCircle className="h-4 w-4 text-green-500" />;
        }
    };

    const handleStatusChange = (id: string, newStatus: string) => {
        console.log("Updating status:", id, newStatus);
    };

    return (
        <div className="flex flex-col h-full">
            <DashboardHeader
                title="Maintenance Requests"
                description="Manage tenant maintenance requests"
            />

            <div className="flex-1 p-6 space-y-6 overflow-auto">
                {/* Stats */}
                <div className="grid grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <p className="text-3xl font-bold">{requests.length}</p>
                            <p className="text-sm text-muted-foreground">Total Requests</p>
                        </CardContent>
                    </Card>
                    <Card className="border-amber-500/50">
                        <CardContent className="pt-6 text-center">
                            <p className="text-3xl font-bold text-amber-500">{requests.filter((r) => r.status === "PENDING").length}</p>
                            <p className="text-sm text-muted-foreground">Pending</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <p className="text-3xl font-bold text-blue-500">{requests.filter((r) => r.status === "IN_PROGRESS").length}</p>
                            <p className="text-sm text-muted-foreground">In Progress</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <p className="text-3xl font-bold text-green-500">{requests.filter((r) => r.status === "COMPLETED").length}</p>
                            <p className="text-sm text-muted-foreground">Completed</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4">
                    <Select
                        value={filter.status}
                        onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                        className="w-40"
                    >
                        <option value="all">All Status</option>
                        <option value="PENDING">Pending</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                    </Select>
                    <Select
                        value={filter.priority}
                        onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
                        className="w-40"
                    >
                        <option value="all">All Priority</option>
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                        <option value="URGENT">Urgent</option>
                    </Select>
                </div>

                {/* Selected Request Detail */}
                {selectedRequest && (
                    <Card className="border-primary/50">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <Wrench className="h-5 w-5 text-primary" />
                                        {selectedRequest.title}
                                    </CardTitle>
                                    <CardDescription className="flex items-center gap-2 mt-1">
                                        <User className="h-3 w-3" /> {selectedRequest.tenant} • {selectedRequest.unitNumber} - {selectedRequest.propertyName}
                                    </CardDescription>
                                </div>
                                {getPriorityBadge(selectedRequest.priority)}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 bg-muted/50 rounded-lg">
                                <p className="text-sm">{selectedRequest.description}</p>
                                <p className="text-xs text-muted-foreground mt-2">Submitted: {selectedRequest.createdAt}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <label className="text-sm font-medium">Update Status:</label>
                                <Select
                                    value={selectedRequest.status}
                                    onChange={(e) => handleStatusChange(selectedRequest.id, e.target.value)}
                                    className="w-40"
                                >
                                    <option value="PENDING">Pending</option>
                                    <option value="IN_PROGRESS">In Progress</option>
                                    <option value="COMPLETED">Completed</option>
                                </Select>
                                <Button variant="outline" size="sm">
                                    <MessageSquare className="h-4 w-4 mr-1" /> Message Tenant
                                </Button>
                                <div className="flex-1" />
                                <Button variant="ghost" onClick={() => setSelectedRequest(null)}>Close</Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Requests List */}
                <Card>
                    <CardHeader>
                        <CardTitle>All Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {filteredRequests.map((request) => (
                                <div
                                    key={request.id}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-primary/10 rounded-lg">
                                            <Wrench className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="font-semibold">{request.title}</p>
                                                {getPriorityBadge(request.priority)}
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {request.tenant} • {request.unitNumber} - {request.propertyName}
                                            </p>
                                            <p className="text-xs text-muted-foreground">{request.createdAt}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-2">
                                            {getStatusIcon(request.status)}
                                            <span className="text-sm">{request.status.replace("_", " ")}</span>
                                        </div>
                                        <Button variant="outline" size="sm" onClick={() => setSelectedRequest(request)}>
                                            <Eye className="h-4 w-4 mr-1" /> Manage
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
