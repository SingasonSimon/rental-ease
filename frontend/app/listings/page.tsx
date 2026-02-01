"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { unitsApi, Unit } from "@/lib/api";
import { PropertyCard } from "@/components/property-card";
import { Pagination } from "@/components/pagination";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function ListingsPage() {
    const [units, setUnits] = useState<Unit[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Filter state
    const [filters, setFilters] = useState({
        location: "",
        minRent: "",
        maxRent: "",
        bedrooms: "",
        status: "AVAILABLE",
    });

    const fetchUnits = async (page: number = 1) => {
        setLoading(true);
        setError(null);
        try {
            const params: Record<string, string | number | undefined> = {
                page,
                limit: 6,
                status: filters.status || undefined,
            };

            if (filters.minRent) params.minRent = Number(filters.minRent);
            if (filters.maxRent) params.maxRent = Number(filters.maxRent);
            if (filters.bedrooms) params.bedrooms = Number(filters.bedrooms);

            const response = await unitsApi.getAll(params);

            // Handle both paginated and array responses
            if (response.data.data) {
                setUnits(response.data.data);
                setTotalPages(response.data.pagination?.totalPages || 1);
            } else if (Array.isArray(response.data)) {
                setUnits(response.data as unknown as Unit[]);
                setTotalPages(1);
            }
        } catch (err) {
            console.error("Failed to fetch units:", err);
            setError("Failed to load listings. Please try again.");
            // Use mock data if API fails
            setUnits(getMockUnits());
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUnits(currentPage);
    }, [currentPage]);

    const handleApplyFilters = () => {
        setCurrentPage(1);
        fetchUnits(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Available Properties</h1>
                    <p className="text-muted-foreground mt-1">
                        Browse our curated selection of verified rental units.
                    </p>
                </div>
            </div>

            {/* Layout: Sidebar Filter + Listings Grid */}
            <div className="grid lg:grid-cols-4 gap-8">
                {/* Filters Sidebar */}
                <aside className="lg:col-span-1 space-y-6">
                    <div className="p-6 border rounded-xl bg-card shadow-sm space-y-6 sticky top-24">
                        <div>
                            <h3 className="font-semibold mb-4">Filters</h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Location</label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="City or Neighborhood"
                                            className="pl-9"
                                            value={filters.location}
                                            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Price Range</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Input
                                            type="number"
                                            placeholder="Min"
                                            value={filters.minRent}
                                            onChange={(e) => setFilters({ ...filters, minRent: e.target.value })}
                                        />
                                        <Input
                                            type="number"
                                            placeholder="Max"
                                            value={filters.maxRent}
                                            onChange={(e) => setFilters({ ...filters, maxRent: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Bedrooms</label>
                                    <Select
                                        value={filters.bedrooms}
                                        onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
                                    >
                                        <option value="">Any</option>
                                        <option value="1">1 Bedroom</option>
                                        <option value="2">2 Bedrooms</option>
                                        <option value="3">3 Bedrooms</option>
                                        <option value="4">4+ Bedrooms</option>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Status</label>
                                    <Select
                                        value={filters.status}
                                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                    >
                                        <option value="">All</option>
                                        <option value="AVAILABLE">Available</option>
                                        <option value="OCCUPIED">Occupied</option>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <Button className="w-full" onClick={handleApplyFilters}>
                            Apply Filters
                        </Button>
                    </div>
                </aside>

                {/* Results Grid */}
                <div className="lg:col-span-3">
                    {loading ? (
                        <div className="grid md:grid-cols-2 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div
                                    key={i}
                                    className="border rounded-xl overflow-hidden bg-card animate-pulse"
                                >
                                    <div className="h-48 bg-muted" />
                                    <div className="p-5 space-y-3">
                                        <div className="h-5 bg-muted rounded w-3/4" />
                                        <div className="h-4 bg-muted rounded w-1/2" />
                                        <div className="h-4 bg-muted rounded w-full" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : error ? (
                        <div className="text-center py-12">
                            <p className="text-destructive mb-4">{error}</p>
                            <Button onClick={() => fetchUnits(currentPage)}>Retry</Button>
                        </div>
                    ) : units.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">No listings found matching your criteria.</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid md:grid-cols-2 gap-6">
                                {units.map((unit) => (
                                    <PropertyCard key={unit.id} unit={unit} />
                                ))}
                            </div>

                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

// Mock data for fallback when API is not available
function getMockUnits(): Unit[] {
    return [
        {
            id: "1",
            unitNumber: "Modern Loft A1",
            bedrooms: 2,
            bathrooms: 2,
            squareFeet: 95,
            rentAmount: 65000,
            status: "AVAILABLE",
            amenities: ["WiFi", "Gym"],
            images: [],
        },
        {
            id: "2",
            unitNumber: "Sunnyvale Heights B3",
            bedrooms: 3,
            bathrooms: 2,
            squareFeet: 120,
            rentAmount: 85000,
            status: "AVAILABLE",
            amenities: ["Parking", "Pool"],
            images: [],
        },
        {
            id: "3",
            unitNumber: "Garden View C2",
            bedrooms: 1,
            bathrooms: 1,
            squareFeet: 55,
            rentAmount: 35000,
            status: "AVAILABLE",
            amenities: ["Balcony"],
            images: [],
        },
        {
            id: "4",
            unitNumber: "Executive Suite D4",
            bedrooms: 4,
            bathrooms: 3,
            squareFeet: 180,
            rentAmount: 120000,
            status: "AVAILABLE",
            amenities: ["Security", "Gym", "Pool"],
            images: [],
        },
        {
            id: "5",
            unitNumber: "Kilimani Heights E1",
            bedrooms: 2,
            bathrooms: 1,
            squareFeet: 80,
            rentAmount: 55000,
            status: "AVAILABLE",
            amenities: ["Parking"],
            images: [],
        },
        {
            id: "6",
            unitNumber: "Westlands Prime F2",
            bedrooms: 3,
            bathrooms: 2,
            squareFeet: 110,
            rentAmount: 95000,
            status: "OCCUPIED",
            amenities: ["Generator", "Security"],
            images: [],
        },
    ];
}
