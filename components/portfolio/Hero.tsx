import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center overflow-hidden py-20">
      <div className="container mx-auto px-6 relative">
        {/* Background blobs for premium feel */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 blur-[120px] animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-primary/5 blur-[120px] animate-pulse delay-700" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
          <div className="max-w-2xl space-y-8 relative z-10 transition-all duration-700 ease-out transform translate-y-0 opacity-100 flex-1">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
                Full-Stack <span className="text-primary italic">MERN</span> Developer
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-xl">
                Building scalable web & mobile apps. Exploring content, video, and AI-driven creativity.
              </p>
            </div>

            <div className="flex items-center space-x-2 text-muted-foreground animate-in fade-in slide-in-from-left duration-1000">
              <MapPin size={20} className="text-primary" />
              <span className="font-medium">Hyderabad, India</span>
            </div>

            <div className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom duration-1000">
              <Button size="lg" className="px-8 h-12 text-base font-semibold group shadow-sm hover:shadow-md" asChild>
                <Link href="/projects" className="flex items-center">
                  View Projects <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="px-8 h-12 text-base font-semibold shadow-sm hover:shadow-md" asChild>
                <Link href="/contact">
                  Contact
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex-1 relative flex justify-center md:justify-end animate-in fade-in zoom-in duration-1000">
            <div className="relative group max-w-[400px]">
              {/* Outer glow effect */}
              <div className="absolute -inset-4 bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-all duration-700 opacity-70 group-hover:opacity-100" />

              {/* Image Container */}
              <div className="relative overflow-hidden transition-transform duration-700 group-hover:scale-[0.92] max-sm:hidden">
                <Image
                  src="https://ik.imagekit.io/jsmasterykoushik/portfolio/test/me-buzz-crop.png"
                  alt="Koushik - Full Stack Developer"
                  width={600}
                  height={600}
                  className="w-full h-full grayscale hover:grayscale-0 transition-all duration-1000 scale-95 group-hover:scale-100 object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
