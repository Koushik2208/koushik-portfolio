import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-background flex items-center">
      {/* Animated background elements - Theme colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-50 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-primary/5 rounded-full blur-3xl opacity-50 animate-pulse delay-700"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 2xl:px-24 py-32 sm:py-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm shadow-sm border border-border">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Portfolio 2026</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground leading-[1.05]">
                <span className="block">Full-Stack</span>
                <span className="text-primary block">MERN Developer</span>
              </h1>

              <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl leading-relaxed mx-auto lg:mx-0">
                I build scalable web & mobile apps and explore storytelling through content, video, and AI-powered creativity.
              </p>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-muted-foreground justify-center lg:justify-start">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Hyderabad, India</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="shadow-lg shadow-primary/20 group text-base h-12 px-8"
                asChild
              >
                <Link href="/projects">
                  View Projects
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="backdrop-blur-sm text-base h-12 px-8"
                asChild
              >
                <Link href="/contact">Contact</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-foreground">3+ yrs</div>
                <div className="text-sm text-muted-foreground">Experience</div>
              </div>

              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-foreground">10+</div>
                <div className="text-sm text-muted-foreground">Projects Built</div>
              </div>

              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-foreground">AI</div>
                <div className="text-sm text-muted-foreground">Certified Generalist</div>
              </div>

            </div>
          </div>

          {/* Image Section */}
          <div className="relative lg:h-[600px] flex items-center justify-center">
            <div className="relative w-full max-w-md lg:max-w-lg">
              {/* Decorative elements - Theme colors */}
              <div className="absolute inset-0 bg-primary/10 rounded-3xl rotate-6 opacity-40"></div>
              <div className="absolute inset-0 bg-primary/20 rounded-3xl -rotate-6 opacity-40"></div>

              {/* Image Container with provided link */}
              <div className="relative aspect-square rounded-3xl bg-muted/20 shadow-2xl overflow-hidden border-8 border-background">
                <Image
                  src="https://ik.imagekit.io/jsmasterykoushik/portfolio/test/me-buzz-crop.png"
                  alt="Koushik - Full Stack Developer"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-card rounded-2xl shadow-lg p-4 border border-border animate-bounce">
                <div className="text-2xl">🚀</div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-card rounded-2xl shadow-lg p-4 border border-border animate-bounce delay-500">
                <div className="text-2xl">💻</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-muted-foreground rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;