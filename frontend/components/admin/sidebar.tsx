"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    Users,
    ClipboardList,
    FileText,
    CreditCard,
    BarChart3,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Shield,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const adminNavItems = [
    { href: "/admin", icon: Home, label: "Overview" },
    { href: "/admin/users", icon: Users, label: "Users" },
    { href: "/admin/applications", icon: ClipboardList, label: "Applications" },
    { href: "/admin/leases", icon: FileText, label: "Leases" },
    { href: "/admin/payments", icon: CreditCard, label: "Payments" },
    { href: "/admin/reports", icon: BarChart3, label: "Reports" },
    { href: "/admin/settings", icon: Settings, label: "Settings" },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={cn(
                "bg-slate-900 text-white h-full flex flex-col transition-all duration-300",
                collapsed ? "w-16" : "w-64"
            )}
        >
            {/* Admin Badge */}
            <div className="p-4 border-b border-slate-700">
                <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                        <Shield className="h-5 w-5 text-white" />
                    </div>
                    {!collapsed && (
                        <div className="overflow-hidden">
                            <p className="font-semibold text-sm truncate">
                                {user?.firstName} {user?.lastName}
                            </p>
                            <p className="text-xs text-slate-400 truncate">Administrator</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1">
                {adminNavItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                                isActive
                                    ? "bg-primary text-white"
                                    : "hover:bg-slate-800 text-slate-300 hover:text-white",
                                collapsed && "justify-center px-2"
                            )}
                        >
                            <item.icon className="h-5 w-5 flex-shrink-0" />
                            {!collapsed && <span className="text-sm">{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-3 border-t border-slate-700 space-y-2">
                <Button
                    variant="ghost"
                    size="sm"
                    className={cn("w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800", collapsed && "justify-center px-2")}
                    onClick={logout}
                >
                    <LogOut className="h-4 w-4" />
                    {!collapsed && <span className="ml-2">Logout</span>}
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className={cn("w-full justify-center text-slate-300 hover:text-white hover:bg-slate-800")}
                    onClick={() => setCollapsed(!collapsed)}
                >
                    {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </Button>
            </div>
        </aside>
    );
}
