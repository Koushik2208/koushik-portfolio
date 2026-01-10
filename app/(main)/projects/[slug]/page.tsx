import Link from "next/link";
import type { Metadata } from 'next';
import { ArrowLeft, Github, ArrowUpRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Section from "@/components/portfolio/Section";
import { IProject } from "@/database/project.model";
import { notFound } from "next/navigation";

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
    const slug = (await params).slug
    const project = await getProject(slug);

    if (!project) {
        return {
            title: 'Project Not Found',
            description: 'The requested project could not be found.',
        }
    }

    return {
        title: project.title,
        description: project.description,
        openGraph: {
            title: project.title,
            description: project.description,
            type: 'website',
            images: project.coverImage ? [
                {
                    url: project.coverImage,
                    width: 1200,
                    height: 630,
                    alt: project.title,
                },
            ] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: project.title,
            description: project.description,
            images: project.coverImage ? [project.coverImage] : [],
        }
    }
}

async function getProject(slug: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/projects/${slug}`, {
            next: { revalidate: 60 }
        });

        if (!res.ok) return null;

        const data = await res.json();
        return data.project || null;
    } catch (error) {
        console.error("Failed to fetch project:", error);
        return null;
    }
}

export default async function ProjectDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project: IProject | null = await getProject(slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen pb-20">
            {/* Hero / Header */}
            <div className="bg-muted/30 border-b pt-20 pb-10">
                <div className="max-w-4xl mx-auto px-6 md:px-0">
                    <Button variant="ghost" size="sm" asChild className="mb-8 -ml-4 text-muted-foreground hover:text-foreground">
                        <Link href="/projects">
                            <ArrowLeft size={16} className="mr-2" /> Back to Projects
                        </Link>
                    </Button>

                    <h1 className="text-4xl md:text-5xl font-bold font-cormorant mb-6 leading-tight">
                        {project.title}
                    </h1>

                    <p className="text-xl text-muted-foreground leading-relaxed font-inter mb-8">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-4 items-center">
                        {project.githubUrl && (
                            <Button variant="outline" asChild>
                                <Link href={project.githubUrl} target="_blank">
                                    <Github size={18} className="mr-2" /> View Source
                                </Link>
                            </Button>
                        )}
                        {project.liveUrl && (
                            <Button asChild>
                                <Link href={project.liveUrl} target="_blank">
                                    <ArrowUpRight size={18} className="mr-2" /> Live Demo
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 md:px-0 py-12">

                {/* Cover Image */}
                {project.coverImage && (
                    <div className="rounded-xl overflow-hidden border shadow-sm mb-12 aspect-video bg-muted relative">
                        <img
                            src={project.coverImage}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Tech Stack */}
                <div className="mb-12">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4 font-inter">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                            <span key={tech} className="px-3 py-1 bg-muted rounded-md text-sm font-medium font-inter">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Project Content */}
                {project.content && (
                    <article className="prose dark:prose-invert prose-xl max-w-none font-inter prose-headings:font-cormorant prose-p:text-xl prose-p:leading-relaxed">
                        <div dangerouslySetInnerHTML={{ __html: project.content }} />
                    </article>
                )}

            </div>
        </main>
    );
}