"use client";

import { useState } from "react";
import { Plus, DoorOpen, Edit, Trash2, Eye, Bed, Bath, Square } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

interface Unit {
    id: string;
    unitNumber: string;
    propertyName: string;
    type: string;
    bedrooms: number;
    bathrooms: number;
    size: number;
    rent: number;
    status: "VACANT" | "OCCUPIED";
}

export default function UnitsPage() {
    const [showForm, setShowForm] = useState(false);
    const [filter, setFilter] = useState({ property: "all", status: "all" });

    const units: Unit[] = [
        { id: "1", unitNumber: "A-201", propertyName: "Kileleshwa Heights", type: "2 Bedroom", bedrooms: 2, bathrooms: 1, size: 85, rent: 65000, status: "OCCUPIED" },
        { id: "2", unitNumber: "A-202", propertyName: "Kileleshwa Heights", type: "1 Bedroom", bedrooms: 1, bathrooms: 1, size: 55, rent: 45000, status: "VACANT" },
        { id: "3", unitNumber: "A-203", propertyName: "Kileleshwa Heights", type: "Studio", bedrooms: 0, bathrooms: 1, size: 35, rent: 30000, status: "OCCUPIED" },
        { id: "4", unitNumber: "B-101", propertyName: "Westlands Prime", type: "3 Bedroom", bedrooms: 3, bathrooms: 2, size: 120, rent: 95000, status: "OCCUPIED" },
        { id: "5", unitNumber: "B-102", propertyName: "Westlands Prime", type: "2 Bedroom", bedrooms: 2, bathrooms: 2, size: 90, rent: 75000, status: "VACANT" },
        { id: "6", unitNumber: "C-301", propertyName: "Lavington Gardens", type: "4 Bedroom", bedrooms: 4, bathrooms: 3, size: 180, rent: 150000, status: "VACANT" },
    ];

    const filteredUnits = units.filter((unit) => {
        if (filter.property !== "all" && unit.propertyName !== filter.property) return false;
        if (filter.status !== "all" && unit.status !== filter.status) return false;
        return true;
    });

    const properties = [...new Set(units.map((u) => u.propertyName))];

    return (
        <div className="flex flex-col h-full">
            <DashboardHeader
                title="Units"
                description="Manage all your rental units"
            />

            <div className="flex-1 p-6 space-y-6 overflow-auto">
                {/* Stats */}
                <div className="grid grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <p className="text-3xl font-bold">{units.length}</p>
                            <p className="text-sm text-muted-foreground">Total Units</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <p className="text-3xl font-bold text-green-500">{units.filter((u) => u.status === "OCCUPIED").length}</p>
                            <p className="text-sm text-muted-foreground">Occupied</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <p className="text-3xl font-bold text-amber-500">{units.filter((u) => u.status === "VACANT").length}</p>
                            <p className="text-sm text-muted-foreground">Vacant</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <p className="text-3xl font-bold text-primary">
                                KES {units.filter((u) => u.status === "OCCUPIED").reduce((acc, u) => acc + u.rent, 0).toLocaleString()}
                            </p>
                            <p className="text-sm text-muted-foreground">Monthly Income</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters & Actions */}
                <div className="flex flex-wrap items-center gap-4">
                    <Select
                        value={filter.property}
                        onChange={(e) => setFilter({ ...filter, property: e.target.value })}
                        className="w-48"
                    >
                        <option value="all">All Properties</option>
                        {properties.map((p) => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </Select>
                    <Select
                        value={filter.status}
                        onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                        className="w-36"
                    >
                        <option value="all">All Status</option>
                        <option value="OCCUPIED">Occupied</option>
                        <option value="VACANT">Vacant</option>
                    </Select>
                    <div className="flex-1" />
                    <Button onClick={() => setShowForm(true)}>
                        <Plus className="h-4 w-4 mr-2" /> Add Unit
                    </Button>
                </div>

                {/* Add Form (simplified) */}
                {showForm && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Add New Unit</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Property</label>
                                        <Select>
                                            <option>Select property</option>
                                            {properties.map((p) => (
                                                <option key={p} value={p}>{p}</option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Unit Number</label>
                                        <Input placeholder="e.g., A-201" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Unit Type</label>
                                        <Select>
                                            <option>Studio</option>
                                            <option>1 Bedroom</option>
                                            <option>2 Bedroom</option>
                                            <option>3 Bedroom</option>
                                            <option>4 Bedroom</option>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-4 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Bedrooms</label>
                                        <Input type="number" min="0" placeholder="0" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Bathrooms</label>
                                        <Input type="number" min="1" placeholder="1" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Size (sqm)</label>
                                        <Input type="number" min="1" placeholder="50" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Monthly Rent (KES)</label>
                                        <Input type="number" min="1" placeholder="50000" />
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Button type="submit">Add Unit</Button>
                                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {/* Units Table */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-3 px-4 font-medium">Unit</th>
                                        <th className="text-left py-3 px-4 font-medium">Property</th>
                                        <th className="text-left py-3 px-4 font-medium">Type</th>
                                        <th className="text-left py-3 px-4 font-medium">Details</th>
                                        <th className="text-left py-3 px-4 font-medium">Rent</th>
                                        <th className="text-left py-3 px-4 font-medium">Status</th>
                                        <th className="text-right py-3 px-4 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUnits.map((unit) => (
                                        <tr key={unit.id} className="border-b last:border-0 hover:bg-muted/50">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2">
                                                    <DoorOpen className="h-4 w-4 text-primary" />
                                                    <span className="font-semibold">{unit.unitNumber}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-muted-foreground">{unit.propertyName}</td>
                                            <td className="py-3 px-4">{unit.type}</td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                                    <span className="flex items-center gap-1"><Bed className="h-3 w-3" /> {unit.bedrooms}</span>
                                                    <span className="flex items-center gap-1"><Bath className="h-3 w-3" /> {unit.bathrooms}</span>
                                                    <span className="flex items-center gap-1"><Square className="h-3 w-3" /> {unit.size}m²</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 font-semibold">KES {unit.rent.toLocaleString()}</td>
                                            <td className="py-3 px-4">
                                                <Badge variant={unit.status === "OCCUPIED" ? "success" : "secondary"}>
                                                    {unit.status}
                                                </Badge>
                                            </td>
                                            <td className="py-3 px-4 text-right">
                                                <div className="flex justify-end gap-1">
                                                    <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                                                    <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                                                    <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
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
