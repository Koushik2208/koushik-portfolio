import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  const stats = [
    { label: "Experience", value: "3+ Yrs" },
    { label: "Projects", value: "10+" },
    { label: "Role", value: "Senior" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-background flex items-center selection:bg-secondary/30">
      {/* Tactical Desktop Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Sticky Note 1 - Orange */}
        <div className="absolute top-[15%] right-[10%] w-48 h-48 bg-secondary/10 border-l-4 border-secondary/20 -rotate-6 artifact-shadow hidden lg:block opacity-60">
          <div className="p-4 font-mono text-[10px] text-secondary uppercase tracking-widest leading-tight">
            Notes:// <br />
            Storytelling <br />
            through <br />
            code.
          </div>
        </div>

        {/* Sticky Note 2 - Blue */}
        <div className="absolute bottom-[20%] left-[5%] w-40 h-40 bg-muted/30 border-r-4 border-muted/50 rotate-12 artifact-shadow hidden lg:block opacity-60">
          <div className="p-4 font-mono text-[10px] text-muted-foreground uppercase tracking-widest leading-tight">
            Archive_ <br />
            v.2026 <br />
            Portfolio
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 2xl:px-24 py-32 sm:py-40">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-10 text-center lg:text-left">
            {/* Metadata Label */}
            <div className="inline-flex items-center gap-4">
              <div className="h-px w-12 bg-border" />
              <span className="font-mono text-[11px] font-bold text-muted-foreground uppercase tracking-[0.3em]">
                [ Creative_Workstation_2026 ]
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-6xl sm:text-7xl lg:text-9xl font-historia font-bold tracking-tighter text-foreground leading-[0.85] italic">
                <span className="block">Full-Stack</span>
                <span className="text-secondary block not-italic">MERN Developer</span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed mx-auto lg:mx-0 font-mono opacity-80">
                I build scalable web & mobile apps and explore storytelling through content, video, and AI-powered creativity.
              </p>
            </div>

            {/* Location & CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-8 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-secondary" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest">Hyderabad, India</span>
              </div>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground artifact-shadow rounded-sm font-mono text-sm uppercase tracking-wider px-8"
                  asChild
                >
                  <Link href="/projects">
                    View Projects
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-sm font-mono text-sm uppercase tracking-wider border-border/60"
                  asChild
                >
                  <Link href="/contact">Contact</Link>
                </Button>
              </div>
            </div>

            {/* Stats - Stamped Look */}
            <div className="grid grid-cols-3 gap-8 pt-10 border-t border-border/40">
              {stats.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest">{stat.label}</div>
                  <div className="text-xl font-bold text-foreground font-mono">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Section - The Polaroid Artifact */}
          <div className="relative lg:h-[650px] flex items-center justify-center">
            <div className="relative w-full max-w-md lg:max-w-lg group">
              {/* Fake Clipping Behind */}
              <div className="absolute -inset-4 bg-muted/20 border border-border/40 rotate-3 rounded-sm pointer-events-none" />

              {/* The Polaroid */}
              <div className="relative bg-card p-4 pb-16 artifact-shadow artifact-rotate-right transition-all duration-500 hover:rotate-0 hover:scale-[1.02] border border-border/20 rounded-sm">
                {/* Washi Tape Effect */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-secondary/20 backdrop-blur-sm -rotate-2 z-10 opacity-70" />

                {/* Image Container */}
                <div className="relative aspect-4/5 bg-muted/20 overflow-hidden rounded-[2px] border border-border/10">
                  <Image
                    src="https://ik.imagekit.io/jsmasterykoushik/portfolio/test/me-new.png"
                    alt="Koushik - Full Stack Developer"
                    fill
                    className="object-cover object-top grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                    priority
                  />
                </div>

                {/* Handwritten Caption */}
                <div className="absolute bottom-4 left-0 w-full text-center">
                  <p className="font-historia text-2xl text-foreground/60 opacity-80">
                    me_at_work
                  </p>
                </div>
              </div>

              {/* Floating Tech Badges - Artifact Style */}
              <div className="absolute -top-8 -right-8 bg-card w-16 h-16 flex items-center justify-center rounded-sm artifact-shadow border border-border/20 rotate-12 group-hover:rotate-0 transition-all">
                <Sparkles className="w-6 h-6 text-secondary" />
              </div>

              <div className="absolute -bottom-6 -left-6 bg-card w-16 h-16 flex items-center justify-center rounded-sm artifact-shadow border border-border/20 -rotate-12 group-hover:rotate-0 transition-all">
                <div className="text-2xl font-mono font-bold text-muted-foreground">01</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - Stamped */}
      <div className="absolute bottom-12 left-12 hidden lg:block">
        <div className="flex items-center gap-4 text-muted-foreground/40 font-mono text-[10px] tracking-[0.4em] uppercase -rotate-90 origin-left">
          <div className="h-px w-12 bg-border/40" />
          Scroll to explore
        </div>
      </div>
    </div>
  );
};

export default Hero;