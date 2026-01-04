import Hero from "@/components/portfolio/Hero";
import Section from "@/components/portfolio/Section";
import ProjectCard from "@/components/portfolio/ProjectCard";
import SkillBadge from "@/components/portfolio/SkillBadge";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <Hero />

      {/* About Highlight */}
      <Section id="about-highlight" title="Story & Vision">
        <div className="max-w-3xl space-y-8">
          <p className="text-2xl md:text-3xl text-muted-foreground leading-relaxed font-cormorant">
            I’m a <span className="text-foreground font-semibold">Full-Stack MERN Developer</span> with 3+ years of experience. Beyond code, I’m exploring visual storytelling and AI-driven creativity to build products that feel alive.
          </p>
          <Button variant="link" className="px-0 text-lg font-bold group" asChild>
            <Link href="/about">
              Learn more about my journey <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* Projects Preview */}
      <Section id="projects-preview" title="Featured Projects" dark>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <ProjectCard
            title="ContentGen Pro"
            description="AI-Powered Personal Branding Assistant that helps users generate and plan social media content based on profession, tone, and audience."
            tags={["Next.js", "Supabase", "OpenAI API"]}
          />
          <ProjectCard
            title="Law Office Management System"
            description="A comprehensive dashboard for managing lawyers, cases, and court hearings with advanced filtering and tracking."
            tags={["Next.js", "TypeScript", "MongoDB"]}
          />
        </div>
        <div className="text-center">
          <Button size="lg" variant="outline" className="shadow-sm" asChild>
            <Link href="/projects">
              Explore All Projects
            </Link>
          </Button>
        </div>
      </Section>

      {/* Writing Preview */}
      <Section id="blog-preview" title="Recent Writing">
        <div className="max-w-2xl space-y-8">
          <div className="space-y-2 group cursor-pointer">
            <span className="text-xs font-bold text-primary uppercase tracking-widest font-inter">Jan 03, 2026</span>
            <h3 className="text-2xl font-bold font-cormorant group-hover:text-primary transition-colors leading-tight">
              The Intersection of AI and Creativity: Why I'm Learning Video Editing as a Developer
            </h3>
          </div>
          <Button variant="link" className="px-0 text-lg font-bold group" asChild>
            <Link href="/blog">
              Read the blog <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* CTA Section */}
      <Section id="cta" title="Let's build together" dark>
        <div className="flex flex-col items-center text-center space-y-8 py-12">
          <h3 className="text-3xl md:text-5xl font-bold font-cormorant max-w-2xl">
            Clean code. Thoughtful design. <br />
            Useful products.
          </h3>
          <Button size="lg" className="px-10 h-14 text-lg shadow-md" asChild>
            <Link href="/contact" className="flex items-center">
              Get in Touch <Mail className="ml-3" size={20} />
            </Link>
          </Button>
        </div>
      </Section>
    </main>
  );
};

export default Home;
