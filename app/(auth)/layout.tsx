import { auth } from "@/auth";
import React from 'react';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (session) {
        return redirect("/dashboard");
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/50">
            <div className="w-full max-w-md p-8 bg-background rounded-lg shadow-lg border">
                {children}
            </div>
        </div>
    );
}
