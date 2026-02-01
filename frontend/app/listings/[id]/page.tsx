"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Bed, Bath, ArrowRight, Share2, Heart, CheckCircle, Shield, Loader2 } from "lucide-react";
import { unitsApi, Unit } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function UnitDetailsPage() {
    const params = useParams();
    const unitId = params.id as string;

    const [unit, setUnit] = useState<Unit | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUnit = async () => {
            setLoading(true);
            try {
                const response = await unitsApi.getById(unitId);
                setUnit(response.data);
            } catch (err) {
                console.error("Failed to fetch unit:", err);
                setError("Failed to load unit details.");
                // Use mock data for demo
                setUnit(getMockUnit(unitId));
            } finally {
                setLoading(false);
            }
        };

        if (unitId) {
            fetchUnit();
        }
    }, [unitId]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-20 flex justify-center items-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error && !unit) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <p className="text-destructive mb-4">{error}</p>
                <Link href="/listings">
                    <Button>Back to Listings</Button>
                </Link>
            </div>
        );
    }

    if (!unit) return null;

    const statusVariant = unit.status === "AVAILABLE" ? "success" : "secondary";

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb & Header */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <h1 className="text-3xl font-bold">{unit.unitNumber}</h1>
                        <Badge variant={statusVariant}>{unit.status}</Badge>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        {unit.property?.address || unit.property?.city || "Location not specified"}
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" aria-label="Share">
                        <Share2 className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon" aria-label="Save">
                        <Heart className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Image Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 h-[400px] md:h-[500px]">
                {/* Main Image */}
                <div className="bg-muted rounded-xl relative overflow-hidden group h-full">
                    {unit.images?.[0] ? (
                        <Image
                            src={unit.images[0].url}
                            alt={unit.unitNumber}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 font-bold text-2xl">
                            Main View
                        </div>
                    )}
                </div>

                {/* Secondary Images */}
                <div className="grid grid-cols-2 gap-4 h-full">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="bg-muted rounded-xl relative overflow-hidden flex items-center justify-center"
                        >
                            {unit.images?.[i] ? (
                                <Image
                                    src={unit.images[i].url}
                                    alt={`${unit.unitNumber} image ${i}`}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <span className="text-muted-foreground/30 font-medium">Image {i}</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-12">
                    {/* Key Features */}
                    <section className="flex gap-8 py-6 border-y">
                        <div className="flex items-center gap-2">
                            <Bed className="h-5 w-5 text-primary" />
                            <span className="font-semibold">{unit.bedrooms} Bedrooms</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Bath className="h-5 w-5 text-primary" />
                            <span className="font-semibold">{unit.bathrooms} Bathrooms</span>
                        </div>
                        {unit.squareFeet && (
                            <div className="flex items-center gap-2">
                                <div className="h-5 w-5 border-2 border-primary rounded-sm flex items-center justify-center text-[10px] font-bold text-primary">
                                    M²
                                </div>
                                <span className="font-semibold">{unit.squareFeet} sq ft</span>
                            </div>
                        )}
                    </section>

                    {/* Description */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">About this home</h2>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            {unit.description ||
                                "Experience comfortable living in this well-maintained apartment. Features modern finishes, plenty of natural light, and access to building amenities."}
                        </p>
                    </section>

                    {/* Amenities */}
                    {unit.amenities && unit.amenities.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold mb-6">Amenities</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {unit.amenities.map((amenity, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                        <span>{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Action Sidebar */}
                <aside className="space-y-6">
                    <div className="p-6 border rounded-xl bg-card shadow-lg sticky top-24">
                        <div className="mb-6">
                            <span className="text-3xl font-bold text-primary">
                                KES {unit.rentAmount.toLocaleString()}
                            </span>
                            <span className="text-muted-foreground">/month</span>
                            {unit.depositAmount && (
                                <p className="text-sm text-muted-foreground mt-1">
                                    Deposit: KES {unit.depositAmount.toLocaleString()}
                                </p>
                            )}
                        </div>

                        <div className="space-y-3 mb-6">
                            <Link href="/login?redirect=/apply">
                                <Button className="w-full" size="lg">
                                    Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Button variant="outline" className="w-full" size="lg">
                                Schedule Tour
                            </Button>
                        </div>

                        <div className="text-xs text-muted-foreground text-center">
                            <p className="flex items-center justify-center gap-1 mb-1">
                                <Shield className="h-3 w-3" /> Verified Management
                            </p>
                            Safety & security guaranteed by RentalManager.
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

// Mock data for demonstration
function getMockUnit(id: string): Unit {
    return {
        id,
        unitNumber: "Modern Loft in Kileleshwa",
        bedrooms: 2,
        bathrooms: 2,
        squareFeet: 1200,
        rentAmount: 65000,
        depositAmount: 65000,
        status: "AVAILABLE",
        description:
            "Experience luxury living in this spacious 2-bedroom loft. Featuring floor-to-ceiling windows, a modern open-plan kitchen, and premium finishes throughout. The building amenities include a rooftop gym, high-speed elevators, and 24/7 security.",
        amenities: [
            "High-Speed Internet",
            "Gym Access",
            "Swimming Pool",
            "Parking Spot",
            "24/7 Security",
            "Backup Generator",
            "Balcony",
            "Pet Friendly",
        ],
        images: [],
        property: {
            id: "prop-1",
            name: "Kileleshwa Premium",
            address: "Othaya Road, Kileleshwa",
            city: "Nairobi",
            isActive: true,
            images: [],
            units: [],
            createdAt: new Date().toISOString(),
        },
    };
}
