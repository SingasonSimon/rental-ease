"use client";

import { useState } from "react";
import { Plus, Building2, Edit, Trash2, MapPin, Eye } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface Property {
    id: string;
    name: string;
    address: string;
    city: string;
    totalUnits: number;
    occupiedUnits: number;
    createdAt: string;
}

export default function PropertiesPage() {
    const [showForm, setShowForm] = useState(false);
    const [editingProperty, setEditingProperty] = useState<Property | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        city: "",
        description: "",
    });

    const properties: Property[] = [
        { id: "1", name: "Kileleshwa Heights", address: "Othaya Road", city: "Nairobi", totalUnits: 12, occupiedUnits: 10, createdAt: "Jan 2024" },
        { id: "2", name: "Westlands Prime", address: "Waiyaki Way", city: "Nairobi", totalUnits: 8, occupiedUnits: 8, createdAt: "Mar 2024" },
        { id: "3", name: "Lavington Gardens", address: "James Gichuru Road", city: "Nairobi", totalUnits: 4, occupiedUnits: 2, createdAt: "Aug 2024" },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting:", formData);
        setShowForm(false);
        setEditingProperty(null);
        setFormData({ name: "", address: "", city: "", description: "" });
    };

    const handleEdit = (property: Property) => {
        setEditingProperty(property);
        setFormData({
            name: property.name,
            address: property.address,
            city: property.city,
            description: "",
        });
        setShowForm(true);
    };

    return (
        <div className="flex flex-col h-full">
            <DashboardHeader
                title="Properties"
                description="Manage your rental properties"
            />

            <div className="flex-1 p-6 space-y-6 overflow-auto">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <p className="text-3xl font-bold text-primary">{properties.length}</p>
                            <p className="text-sm text-muted-foreground">Total Properties</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <p className="text-3xl font-bold">{properties.reduce((acc, p) => acc + p.totalUnits, 0)}</p>
                            <p className="text-sm text-muted-foreground">Total Units</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <p className="text-3xl font-bold text-green-500">
                                {Math.round((properties.reduce((acc, p) => acc + p.occupiedUnits, 0) / properties.reduce((acc, p) => acc + p.totalUnits, 0)) * 100)}%
                            </p>
                            <p className="text-sm text-muted-foreground">Overall Occupancy</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Add/Edit Form */}
                {showForm ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>{editingProperty ? "Edit Property" : "Add New Property"}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Property Name</label>
                                        <Input
                                            placeholder="e.g., Kileleshwa Heights"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">City</label>
                                        <Input
                                            placeholder="e.g., Nairobi"
                                            value={formData.city}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Address</label>
                                    <Input
                                        placeholder="Full street address"
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Description</label>
                                    <textarea
                                        className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        placeholder="Property description..."
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <Button type="submit">{editingProperty ? "Update Property" : "Add Property"}</Button>
                                    <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditingProperty(null); }}>
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                ) : (
                    <Button onClick={() => setShowForm(true)}>
                        <Plus className="h-4 w-4 mr-2" /> Add Property
                    </Button>
                )}

                {/* Properties Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map((property) => (
                        <Card key={property.id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                            <Building2 className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg">{property.name}</CardTitle>
                                            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                                                <MapPin className="h-3 w-3" />
                                                {property.address}, {property.city}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold">{property.totalUnits}</p>
                                        <p className="text-xs text-muted-foreground">Total Units</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-green-500">{property.occupiedUnits}</p>
                                        <p className="text-xs text-muted-foreground">Occupied</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-amber-500">{property.totalUnits - property.occupiedUnits}</p>
                                        <p className="text-xs text-muted-foreground">Vacant</p>
                                    </div>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden mb-4">
                                    <div
                                        className="h-full bg-green-500 rounded-full"
                                        style={{ width: `${(property.occupiedUnits / property.totalUnits) * 100}%` }}
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="flex-1">
                                        <Eye className="h-4 w-4 mr-1" /> View Units
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleEdit(property)}>
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-destructive">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
