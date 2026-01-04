"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Experience", href: "/experience" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 font-inter transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-md py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-tight text-primary hover:opacity-80 transition-opacity">
          KOUSHIK
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-all duration-200 relative group",
                isActive(link.href)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.name}
              {isActive(link.href) && (
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Menu (Shadcn Sheet) */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="text-foreground p-2 hover:bg-muted transition-colors">
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[400px] p-0 border-none shadow-2xl">
              <div className="flex flex-col h-full bg-background">
                <SheetHeader className="p-6 border-b border-border/50">
                  <div className="flex items-center justify-between">
                    <SheetTitle className="text-left text-2xl font-bold tracking-tight text-primary">
                      KOUSHIK
                    </SheetTitle>
                  </div>
                </SheetHeader>

                <div className="flex flex-col p-6 space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={cn(
                        "text-2xl font-bold py-4 transition-all duration-200 flex items-center justify-between group",
                        isActive(link.href)
                          ? "text-primary translate-x-2"
                          : "text-muted-foreground hover:text-foreground hover:translate-x-2"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="font-cormorant">{link.name}</span>
                      {isActive(link.href) && (
                        <div className="w-2 h-2 bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                      )}
                    </Link>
                  ))}
                </div>

                <div className="mt-auto p-8 bg-muted/30 border-t border-border/50">
                  <p className="text-sm text-muted-foreground mb-4 font-inter uppercase tracking-widest">Connect</p>
                  <div className="flex gap-4">
                    <Link href="mailto:gorrekoushik@gmail.com" className="text-primary font-bold hover:underline underline-offset-4">Email</Link>
                    <Link href="https://linkedin.com" className="text-primary font-bold hover:underline underline-offset-4">LinkedIn</Link>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
