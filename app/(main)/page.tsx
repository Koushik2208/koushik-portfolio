import Hero from "@/components/portfolio/Hero";
import Section from "@/components/portfolio/Section";
import ProjectCard from "@/components/portfolio/ProjectCard";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IProject } from "@/database/project.model";
import { IBlog } from "@/database/blog.model";

async function getFeaturedProjects() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/projects?status=published`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.projects?.slice(0, 2) || [];
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}

async function getRecentBlogs() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/blogs?status=published`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.blogs?.slice(0, 3) || [];
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return [];
  }
}

const Home = async () => {
  const projects = await getFeaturedProjects();
  const blogs = await getRecentBlogs();

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <Hero />

      {/* About Highlight */}
      <Section id="about-highlight" title="Story & Vision">
        <div className="max-w-3xl space-y-8">
          <p className="text-2xl md:text-3xl text-muted-foreground leading-relaxed ">
            I&apos;m a <span className="text-foreground font-semibold">Full-Stack MERN Developer</span> with 3+ years of experience. Beyond code, I’m exploring visual storytelling and AI-driven creativity to build products that feel alive.
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
          {projects.map((project: IProject) => (
            <ProjectCard
              key={(project._id as any).toString()}
              title={project.title}
              description={project.description}
              tags={project.techStack}
              image={project.coverImage}
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
              slug={project.slug}
            />
          ))}
          {projects.length === 0 && (
            <p className="text-muted-foreground col-span-2 text-center py-10">
              Check back soon for new projects!
            </p>
          )}
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
          {blogs.map((blog: IBlog) => (
            <div key={(blog._id as any).toString()} className="space-y-2 group cursor-pointer block">
              <Link href={`/blog/${blog.slug}`}>
                <span className="text-xs font-bold text-primary uppercase tracking-widest font-inter">
                  {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
                <h3 className="text-2xl font-bold  group-hover:text-primary transition-colors leading-tight mt-1">
                  {blog.title}
                </h3>
                <p className="text-muted-foreground line-clamp-2 mt-2 font-inter text-sm">
                  {blog.excerpt}
                </p>
              </Link>
            </div>
          ))}
          {blogs.length === 0 && (
            <p className="text-muted-foreground py-10">
              Writing something interesting... coming soon!
            </p>
          )}

          <Button variant="link" className="px-0 text-lg font-bold group" asChild>
            <Link href="/blog">
              Read all posts <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* CTA Section */}
      <Section id="cta" title="Let's build together" dark>
        <div className="flex flex-col items-center text-center space-y-8 py-12">
          <h3 className="text-3xl md:text-5xl font-bold  max-w-2xl">
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
