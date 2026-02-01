"use client";

import { ProtectedRoute } from "@/components/protected-route";
import { LandlordSidebar } from "@/components/landlord/sidebar";

export default function LandlordLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute allowedRoles={["LANDLORD", "ADMIN"]}>
            <div className="flex h-[calc(100vh-64px)]">
                <LandlordSidebar />
                <div className="flex-1 overflow-auto">{children}</div>
            </div>
        </ProtectedRoute>
    );
}
