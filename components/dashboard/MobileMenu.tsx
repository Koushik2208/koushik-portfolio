"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Menu, LogOut, Home, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { sidebarLinks } from "./Sidebar";
import * as React from "react";

interface MobileMenuProps {
    user?: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
}

export function MobileMenu({ user }: MobileMenuProps) {
    const pathname = usePathname();
    const [open, setOpen] = React.useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0 flex flex-col">
                <SheetHeader className="p-6 border-b bg-muted/10 text-left">
                    <SheetTitle className="text-lg font-bold">Menu</SheetTitle>
                    {user && (
                        <div className="flex items-center gap-3 mt-2">
                            <div className="w-8 h-8 bg-primary/10 flex items-center justify-center text-xs font-bold ring-1 ring-primary/20 rounded-full overflow-hidden">
                                {user.image ? (
                                    <img src={user.image} alt={user.name || "User"} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-primary">{user.name?.charAt(0) || "U"}</span>
                                )}
                            </div>
                            <div className="flex flex-col overflow-hidden">
                                <span className="text-sm font-medium truncate">{user.name}</span>
                                <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                            </div>
                        </div>
                    )}
                </SheetHeader>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {sidebarLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href || (link.href !== "/dashboard" && pathname.startsWith(link.href));

                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className={cn(
                                    "flex items-center justify-between px-4 py-3 text-sm font-medium transition-all group rounded-md",
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
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group rounded-md"
                    >
                        <Home size={18} className="text-muted-foreground group-hover:text-foreground" />
                        <span>Back to Site</span>
                    </Link>
                    <button
                        onClick={() => {
                            setOpen(false);
                            signOut({ callbackUrl: "/login" });
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/10 transition-all cursor-pointer rounded-md"
                    >
                        <LogOut size={18} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
