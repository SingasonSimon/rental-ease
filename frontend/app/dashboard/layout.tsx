"use client";

import { ProtectedRoute } from "@/components/protected-route";
import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute allowedRoles={["TENANT", "LANDLORD", "ADMIN"]}>
            <div className="flex h-[calc(100vh-64px)]">
                <DashboardSidebar />
                <div className="flex-1 overflow-auto">{children}</div>
            </div>
        </ProtectedRoute>
    );
}
