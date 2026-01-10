"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
    FileText,
    LayoutGrid,
    Home,
    Settings,
    LogOut,
    ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export const sidebarLinks = [
    {
        name: "Overview",
        href: "/dashboard",
        icon: Home,
    },
    {
        name: "Blogs",
        href: "/dashboard/blogs",
        icon: FileText,
    },
    {
        name: "Projects",
        href: "/dashboard/projects",
        icon: LayoutGrid,
    },
    // {
    //     name: "Settings",
    //     href: "/dashboard/settings",
    //     icon: Settings,
    // },
];

export function DashboardSidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden md:flex w-64 bg-card border-r flex-col h-screen sticky top-0">
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {sidebarLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href || (link.href !== "/dashboard" && pathname.startsWith(link.href));

                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "flex items-center justify-between px-4 py-3 text-sm font-medium transition-all group",
                                isActive
                                    ? "bg-primary/10 text-primary shadow-sm"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <Icon size={18} className={cn(isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                                <span>{link.name}</span>
                            </div>
                            {isActive && <ChevronRight size={14} className="text-primary" />}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t bg-muted/20 space-y-1">
                <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
                >
                    <Home size={18} className="text-muted-foreground group-hover:text-foreground" />
                    <span>Back to Site</span>
                </Link>
                <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/10 transition-all cursor-pointer"
                >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
}
