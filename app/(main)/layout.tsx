import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import React from 'react';

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            <div className="pt-20">
                {children}
            </div>
            <Footer />
        </>
    );
}
