import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from 'react';
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { MobileMenu } from "@/components/dashboard/MobileMenu";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="flex min-h-screen font-inter bg-muted/10">
            <DashboardSidebar />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-16 border-b flex items-center px-4 md:px-8 justify-between bg-background sticky top-0 z-30 shadow-sm">
                    <div className="flex items-center gap-4">
                        <MobileMenu user={session.user} />
                        <div className="flex flex-col md:flex">
                            <span className="font-bold text-foreground text-sm uppercase tracking-wider">Welcome back, Boss</span>
                            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">{session.user?.email}</span>
                        </div>
                    </div>
                    <div className="w-9 h-9 bg-primary/10 flex items-center justify-center text-xs font-bold ring-1 ring-primary/20 overflow-hidden shadow-inner">
                        {session.user?.image ? (
                            <img src={session.user.image} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-primary">{session.user?.name?.charAt(0) || "A"}</span>
                        )}
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-4 md:p-8 flex-1">
                    {children}
                </div>
            </main>
        </div>
    );
}
