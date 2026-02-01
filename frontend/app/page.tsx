"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Building2, CheckCircle, Search, Shield } from "lucide-react";
import { unitsApi, Unit } from "@/lib/api";
import { PropertyCard } from "@/components/property-card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [featuredUnits, setFeaturedUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedUnits = async () => {
      try {
        const response = await unitsApi.getAll({ status: "AVAILABLE", limit: 3 });
        if (response.data.data) {
          setFeaturedUnits(response.data.data);
        } else if (Array.isArray(response.data)) {
          setFeaturedUnits((response.data as unknown as Unit[]).slice(0, 3));
        }
      } catch (err) {
        console.error("Failed to fetch featured units:", err);
        // Use mock data
        setFeaturedUnits(getMockUnits());
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedUnits();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/30 -z-10" />
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-foreground">
                Find Your Perfect <span className="text-primary">Home</span> with Ease
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Discover a modern way to rent. Seamless payments, maintenance requests at your fingertips, and transparent communication.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/listings">
                  <Button size="lg" className="shadow-lg shadow-primary/20">
                    Browse Listings <Search className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="outline" size="lg">
                    List Your Property
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl border bg-background/50 backdrop-blur-sm">
              <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
                <Building2 className="h-32 w-32 text-muted-foreground/20" />
                <p className="absolute bottom-4 text-xs text-muted-foreground">
                  Premium Rental Experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose RentalManager?</h2>
            <p className="text-muted-foreground">
              We streamline the entire rental experience for both landlords and tenants.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-primary" />}
              title="Secure Payments"
              description="Pay rent securely via M-Pesa integration with instant receipts and history tracking."
            />
            <FeatureCard
              icon={<CheckCircle className="h-10 w-10 text-primary" />}
              title="Easy Maintenance"
              description="Submit maintenance requests instantly and track their status in real-time."
            />
            <FeatureCard
              icon={<Building2 className="h-10 w-10 text-primary" />}
              title="Verified Listings"
              description="Browse thoroughly vetted properties with detailed amenities and images."
            />
          </div>
        </div>
      </section>

      {/* Featured Listings Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Properties</h2>
              <p className="text-muted-foreground">Explore our top-rated available units.</p>
            </div>
            <Link href="/listings" className="hidden md:flex items-center text-primary font-medium hover:underline">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border rounded-xl overflow-hidden bg-card animate-pulse">
                  <div className="h-48 bg-muted" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredUnits.map((unit) => (
                <PropertyCard key={unit.id} unit={unit} />
              ))}
            </div>
          )}

          <div className="mt-8 text-center md:hidden">
            <Link href="/listings" className="inline-flex items-center text-primary font-medium hover:underline">
              View All Listings <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-2xl bg-background border shadow-sm hover:shadow-md transition-all">
      <div className="mb-4 p-3 bg-primary/5 rounded-xl w-fit">{icon}</div>
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function getMockUnits(): Unit[] {
  return [
    {
      id: "1",
      unitNumber: "Sunnyvale Heights",
      bedrooms: 2,
      bathrooms: 2,
      rentAmount: 45000,
      status: "AVAILABLE",
      amenities: [],
      images: [],
    },
    {
      id: "2",
      unitNumber: "Modern Loft",
      bedrooms: 3,
      bathrooms: 2,
      rentAmount: 65000,
      status: "AVAILABLE",
      amenities: [],
      images: [],
    },
    {
      id: "3",
      unitNumber: "Garden View Apartment",
      bedrooms: 1,
      bathrooms: 1,
      rentAmount: 35000,
      status: "AVAILABLE",
      amenities: [],
      images: [],
    },
  ];
}
