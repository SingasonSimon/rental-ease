"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    Building2,
    DoorOpen,
    ClipboardList,
    FileText,
    CreditCard,
    Wrench,
    LogOut,
    ChevronLeft,
    ChevronRight,
    User,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const landlordNavItems = [
    { href: "/landlord", icon: Home, label: "Overview" },
    { href: "/landlord/properties", icon: Building2, label: "Properties" },
    { href: "/landlord/units", icon: DoorOpen, label: "Units" },
    { href: "/landlord/applications", icon: ClipboardList, label: "Applications" },
    { href: "/landlord/leases", icon: FileText, label: "Leases" },
    { href: "/landlord/payments", icon: CreditCard, label: "Payments" },
    { href: "/landlord/maintenance", icon: Wrench, label: "Maintenance" },
];

export function LandlordSidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={cn(
                "bg-card border-r h-full flex flex-col transition-all duration-300",
                collapsed ? "w-16" : "w-64"
            )}
        >
            {/* User Info */}
            <div className="p-4 border-b">
                <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                    </div>
                    {!collapsed && (
                        <div className="overflow-hidden">
                            <p className="font-semibold text-sm truncate">
                                {user?.firstName} {user?.lastName}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">Landlord</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1">
                {landlordNavItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                                isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-muted text-muted-foreground hover:text-foreground",
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
            <div className="p-3 border-t space-y-2">
                <Button
                    variant="ghost"
                    size="sm"
                    className={cn("w-full justify-start", collapsed && "justify-center px-2")}
                    onClick={logout}
                >
                    <LogOut className="h-4 w-4" />
                    {!collapsed && <span className="ml-2">Logout</span>}
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className={cn("w-full justify-center")}
                    onClick={() => setCollapsed(!collapsed)}
                >
                    {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </Button>
            </div>
        </aside>
    );
}
