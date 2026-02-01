import Link from "next/link";
import Image from "next/image";
import { MapPin, Bed, Bath, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Unit } from "@/lib/api";

interface PropertyCardProps {
    unit: Unit;
}

export function PropertyCard({ unit }: PropertyCardProps) {
    const statusVariant = unit.status === "AVAILABLE" ? "success" : unit.status === "OCCUPIED" ? "secondary" : "destructive";

    return (
        <Card className="group overflow-hidden hover:shadow-lg transition-all">
            <div className="h-48 bg-muted relative overflow-hidden">
                {unit.images?.[0] ? (
                    <Image
                        src={unit.images[0].url}
                        alt={unit.unitNumber}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                        No Image
                    </div>
                )}
                <div className="absolute top-3 right-3">
                    <Badge variant={statusVariant}>{unit.status}</Badge>
                </div>
            </div>
            <CardContent className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                            {unit.unitNumber}
                        </h3>
                        {unit.property && (
                            <div className="flex items-center text-muted-foreground text-sm mt-1">
                                <MapPin className="h-3 w-3 mr-1" />
                                {unit.property.city}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex gap-4 my-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1" /> {unit.bedrooms} Beds
                    </div>
                    <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1" /> {unit.bathrooms} Baths
                    </div>
                    {unit.squareFeet && (
                        <div className="flex items-center">{unit.squareFeet} m²</div>
                    )}
                </div>

                <div className="pt-4 border-t flex items-center justify-between">
                    <div>
                        <span className="text-xl font-bold text-primary">
                            KES {unit.rentAmount.toLocaleString()}
                        </span>
                        <span className="text-xs text-muted-foreground">/month</span>
                    </div>
                    <Link href={`/listings/${unit.id}`}>
                        <Button variant="ghost" size="sm">
                            View Details <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
