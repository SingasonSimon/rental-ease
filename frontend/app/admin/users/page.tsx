"use client";

import { useState } from "react";
import { Users, Plus, Edit, Trash2, Shield, User, Building2, Search, MoreHorizontal } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

interface UserData {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: "ADMIN" | "LANDLORD" | "TENANT";
    status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
    createdAt: string;
}

export default function UsersPage() {
    const [showForm, setShowForm] = useState(false);
    const [filter, setFilter] = useState({ role: "all", status: "all", search: "" });
    const [editingUser, setEditingUser] = useState<UserData | null>(null);

    const users: UserData[] = [
        { id: "1", firstName: "Admin", lastName: "User", email: "admin@rental.com", phone: "+254 700 000 001", role: "ADMIN", status: "ACTIVE", createdAt: "Jan 1, 2024" },
        { id: "2", firstName: "John", lastName: "Kamau", email: "john.kamau@example.com", phone: "+254 712 345 678", role: "LANDLORD", status: "ACTIVE", createdAt: "Mar 15, 2024" },
        { id: "3", firstName: "Jane", lastName: "Mwangi", email: "jane@example.com", phone: "+254 722 456 789", role: "TENANT", status: "ACTIVE", createdAt: "Jun 20, 2024" },
        { id: "4", firstName: "Peter", lastName: "Ochieng", email: "peter@example.com", phone: "+254 733 567 890", role: "TENANT", status: "ACTIVE", createdAt: "Aug 10, 2024" },
        { id: "5", firstName: "Mary", lastName: "Wanjiku", email: "mary@example.com", phone: "+254 745 678 901", role: "TENANT", status: "SUSPENDED", createdAt: "Sep 25, 2024" },
        { id: "6", firstName: "Grace", lastName: "Properties", email: "grace@landlord.com", phone: "+254 756 789 012", role: "LANDLORD", status: "ACTIVE", createdAt: "Oct 5, 2024" },
    ];

    const filteredUsers = users.filter((user) => {
        if (filter.role !== "all" && user.role !== filter.role) return false;
        if (filter.status !== "all" && user.status !== filter.status) return false;
        if (filter.search) {
            const search = filter.search.toLowerCase();
            if (!user.firstName.toLowerCase().includes(search) &&
                !user.lastName.toLowerCase().includes(search) &&
                !user.email.toLowerCase().includes(search)) {
                return false;
            }
        }
        return true;
    });

    const getRoleBadge = (role: UserData["role"]) => {
        switch (role) {
            case "ADMIN":
                return <Badge className="bg-purple-100 text-purple-800"><Shield className="h-3 w-3 mr-1" /> Admin</Badge>;
            case "LANDLORD":
                return <Badge className="bg-blue-100 text-blue-800"><Building2 className="h-3 w-3 mr-1" /> Landlord</Badge>;
            case "TENANT":
                return <Badge variant="secondary"><User className="h-3 w-3 mr-1" /> Tenant</Badge>;
        }
    };

    const getStatusBadge = (status: UserData["status"]) => {
        switch (status) {
            case "ACTIVE":
                return <Badge variant="success">Active</Badge>;
            case "INACTIVE":
                return <Badge variant="secondary">Inactive</Badge>;
            case "SUSPENDED":
                return <Badge variant="destructive">Suspended</Badge>;
        }
    };

    return (
        <div className="flex flex-col h-full">
            <DashboardHeader
                title="User Management"
                description="Manage all system users"
            />

            <div className="flex-1 p-6 space-y-6 overflow-auto">
                {/* Stats */}
                <div className="grid grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <p className="text-3xl font-bold">{users.length}</p>
                            <p className="text-sm text-muted-foreground">Total Users</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <p className="text-3xl font-bold text-purple-500">{users.filter((u) => u.role === "ADMIN").length}</p>
                            <p className="text-sm text-muted-foreground">Admins</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <p className="text-3xl font-bold text-blue-500">{users.filter((u) => u.role === "LANDLORD").length}</p>
                            <p className="text-sm text-muted-foreground">Landlords</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <p className="text-3xl font-bold text-gray-500">{users.filter((u) => u.role === "TENANT").length}</p>
                            <p className="text-sm text-muted-foreground">Tenants</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters & Actions */}
                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search users..."
                            className="pl-9"
                            value={filter.search}
                            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                        />
                    </div>
                    <Select
                        value={filter.role}
                        onChange={(e) => setFilter({ ...filter, role: e.target.value })}
                        className="w-36"
                    >
                        <option value="all">All Roles</option>
                        <option value="ADMIN">Admin</option>
                        <option value="LANDLORD">Landlord</option>
                        <option value="TENANT">Tenant</option>
                    </Select>
                    <Select
                        value={filter.status}
                        onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                        className="w-36"
                    >
                        <option value="all">All Status</option>
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                        <option value="SUSPENDED">Suspended</option>
                    </Select>
                    <div className="flex-1" />
                    <Button onClick={() => setShowForm(true)}>
                        <Plus className="h-4 w-4 mr-2" /> Add User
                    </Button>
                </div>

                {/* Add/Edit Form */}
                {showForm && (
                    <Card>
                        <CardHeader>
                            <CardTitle>{editingUser ? "Edit User" : "Add New User"}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">First Name</label>
                                        <Input placeholder="John" defaultValue={editingUser?.firstName} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Last Name</label>
                                        <Input placeholder="Doe" defaultValue={editingUser?.lastName} />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Email</label>
                                        <Input type="email" placeholder="john@example.com" defaultValue={editingUser?.email} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Phone</label>
                                        <Input placeholder="+254 700 000 000" defaultValue={editingUser?.phone} />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Role</label>
                                        <Select defaultValue={editingUser?.role || "TENANT"}>
                                            <option value="TENANT">Tenant</option>
                                            <option value="LANDLORD">Landlord</option>
                                            <option value="ADMIN">Admin</option>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Status</label>
                                        <Select defaultValue={editingUser?.status || "ACTIVE"}>
                                            <option value="ACTIVE">Active</option>
                                            <option value="INACTIVE">Inactive</option>
                                            <option value="SUSPENDED">Suspended</option>
                                        </Select>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Button type="submit">{editingUser ? "Update User" : "Create User"}</Button>
                                    <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditingUser(null); }}>Cancel</Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {/* Users Table */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-3 px-4 font-medium">User</th>
                                        <th className="text-left py-3 px-4 font-medium">Contact</th>
                                        <th className="text-left py-3 px-4 font-medium">Role</th>
                                        <th className="text-left py-3 px-4 font-medium">Status</th>
                                        <th className="text-left py-3 px-4 font-medium">Joined</th>
                                        <th className="text-right py-3 px-4 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user) => (
                                        <tr key={user.id} className="border-b last:border-0 hover:bg-muted/50">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                        <User className="h-4 w-4 text-primary" />
                                                    </div>
                                                    <span className="font-semibold">{user.firstName} {user.lastName}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <p className="text-sm">{user.email}</p>
                                                <p className="text-xs text-muted-foreground">{user.phone}</p>
                                            </td>
                                            <td className="py-3 px-4">{getRoleBadge(user.role)}</td>
                                            <td className="py-3 px-4">{getStatusBadge(user.status)}</td>
                                            <td className="py-3 px-4 text-muted-foreground">{user.createdAt}</td>
                                            <td className="py-3 px-4 text-right">
                                                <div className="flex justify-end gap-1">
                                                    <Button variant="ghost" size="icon" onClick={() => { setEditingUser(user); setShowForm(true); }}>
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="text-destructive">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
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
