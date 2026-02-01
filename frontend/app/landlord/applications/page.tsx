"use client";

import { useState } from "react";
import { ClipboardList, CheckCircle, XCircle, Eye, User, Phone, Mail, Calendar } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";

interface Application {
    id: string;
    applicantName: string;
    email: string;
    phone: string;
    unitNumber: string;
    propertyName: string;
    submittedAt: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    message: string;
}

export default function ApplicationsPage() {
    const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
    const [filter, setFilter] = useState("all");

    const applications: Application[] = [
        { id: "1", applicantName: "Jane Mwangi", email: "jane@example.com", phone: "+254 712 345 678", unitNumber: "A-202", propertyName: "Kileleshwa Heights", submittedAt: "Jan 28, 2026", status: "PENDING", message: "I'm interested in the 1 bedroom unit. I work as an accountant." },
        { id: "2", applicantName: "Peter Ochieng", email: "peter@example.com", phone: "+254 722 456 789", unitNumber: "B-102", propertyName: "Westlands Prime", submittedAt: "Jan 27, 2026", status: "PENDING", message: "Looking for a quiet place to work from home." },
        { id: "3", applicantName: "Mary Wanjiku", email: "mary@example.com", phone: "+254 733 567 890", unitNumber: "C-301", propertyName: "Lavington Gardens", submittedAt: "Jan 25, 2026", status: "PENDING", message: "Family of 4, looking for a spacious unit." },
        { id: "4", applicantName: "John Kamau", email: "john@example.com", phone: "+254 745 678 901", unitNumber: "A-105", propertyName: "Kileleshwa Heights", submittedAt: "Jan 20, 2026", status: "APPROVED", message: "Relocating for work." },
        { id: "5", applicantName: "Grace Akinyi", email: "grace@example.com", phone: "+254 756 789 012", unitNumber: "B-103", propertyName: "Westlands Prime", submittedAt: "Jan 15, 2026", status: "REJECTED", message: "Student looking for accommodation." },
    ];

    const filteredApplications = filter === "all"
        ? applications
        : applications.filter((a) => a.status === filter);

    const handleApprove = (id: string) => {
        console.log("Approving application:", id);
        setSelectedApplication(null);
    };

    const handleReject = (id: string) => {
        console.log("Rejecting application:", id);
        setSelectedApplication(null);
    };

    return (
        <div className="flex flex-col h-full">
            <DashboardHeader
                title="Applications"
                description="Review and manage rental applications"
            />

            <div className="flex-1 p-6 space-y-6 overflow-auto">
                {/* Stats */}
                <div className="grid grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <p className="text-3xl font-bold">{applications.length}</p>
                            <p className="text-sm text-muted-foreground">Total</p>
                        </CardContent>
                    </Card>
                    <Card className="border-amber-500/50">
                        <CardContent className="pt-6 text-center">
                            <p className="text-3xl font-bold text-amber-500">{applications.filter((a) => a.status === "PENDING").length}</p>
                            <p className="text-sm text-muted-foreground">Pending Review</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <p className="text-3xl font-bold text-green-500">{applications.filter((a) => a.status === "APPROVED").length}</p>
                            <p className="text-sm text-muted-foreground">Approved</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <p className="text-3xl font-bold text-red-500">{applications.filter((a) => a.status === "REJECTED").length}</p>
                            <p className="text-sm text-muted-foreground">Rejected</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filter */}
                <div className="flex items-center gap-4">
                    <Select value={filter} onChange={(e) => setFilter(e.target.value)} className="w-48">
                        <option value="all">All Applications</option>
                        <option value="PENDING">Pending</option>
                        <option value="APPROVED">Approved</option>
                        <option value="REJECTED">Rejected</option>
                    </Select>
                </div>

                {/* Application Detail Modal */}
                {selectedApplication && (
                    <Card className="border-primary/50">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="h-5 w-5 text-primary" />
                                        {selectedApplication.applicantName}
                                    </CardTitle>
                                    <CardDescription>
                                        Application for {selectedApplication.unitNumber} - {selectedApplication.propertyName}
                                    </CardDescription>
                                </div>
                                <Badge variant={
                                    selectedApplication.status === "PENDING" ? "secondary" :
                                        selectedApplication.status === "APPROVED" ? "success" : "destructive"
                                }>
                                    {selectedApplication.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    {selectedApplication.email}
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    {selectedApplication.phone}
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    Submitted: {selectedApplication.submittedAt}
                                </div>
                            </div>
                            <div className="p-4 bg-muted/50 rounded-lg">
                                <p className="text-sm font-medium mb-2">Applicant Message:</p>
                                <p className="text-sm text-muted-foreground">{selectedApplication.message}</p>
                            </div>
                            {selectedApplication.status === "PENDING" && (
                                <div className="flex gap-3">
                                    <Button onClick={() => handleApprove(selectedApplication.id)} className="bg-green-600 hover:bg-green-700">
                                        <CheckCircle className="h-4 w-4 mr-2" /> Approve
                                    </Button>
                                    <Button variant="destructive" onClick={() => handleReject(selectedApplication.id)}>
                                        <XCircle className="h-4 w-4 mr-2" /> Reject
                                    </Button>
                                    <Button variant="outline" onClick={() => setSelectedApplication(null)}>Close</Button>
                                </div>
                            )}
                            {selectedApplication.status !== "PENDING" && (
                                <Button variant="outline" onClick={() => setSelectedApplication(null)}>Close</Button>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Applications List */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            {filteredApplications.map((app) => (
                                <div
                                    key={app.id}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-primary/10 rounded-lg">
                                            <ClipboardList className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">{app.applicantName}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {app.unitNumber} - {app.propertyName}
                                            </p>
                                            <p className="text-xs text-muted-foreground">{app.submittedAt}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Badge variant={
                                            app.status === "PENDING" ? "secondary" :
                                                app.status === "APPROVED" ? "success" : "destructive"
                                        }>
                                            {app.status}
                                        </Badge>
                                        <Button variant="outline" size="sm" onClick={() => setSelectedApplication(app)}>
                                            <Eye className="h-4 w-4 mr-1" /> Review
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
