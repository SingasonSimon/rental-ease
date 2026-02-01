"use client";

import { ProtectedRoute } from "@/components/protected-route";
import { AdminSidebar } from "@/components/admin/sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute allowedRoles={["ADMIN"]}>
            <div className="flex h-[calc(100vh-64px)]">
                <AdminSidebar />
                <div className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-900/50">{children}</div>
            </div>
        </ProtectedRoute>
    );
}
