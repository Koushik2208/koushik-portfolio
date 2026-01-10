"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LayoutGrid, ExternalLink, Github, Loader2, Pencil, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { IProject } from "@/database/project.model";

export default function DashboardProjectsPage() {
    const [projects, setProjects] = useState<IProject[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch("/api/projects?status=all");
                const data = await response.json();
                setProjects(data.projects || []);
            } catch (error) {
                console.error("Failed to fetch projects:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Projects</h1>
                    <p className="text-muted-foreground">Showcase your best engineering work.</p>
                </div>
                <Button asChild className="group">
                    <Link href="/dashboard/projects/new">
                        Add Project
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="animate-spin text-primary" size={40} />
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {projects.map((project) => (
                        <Card key={(project._id as any).toString()} className="hover:shadow-md transition-shadow flex flex-col font-inter overflow-hidden">
                            {project.coverImage && (
                                <div className="aspect-video w-full overflow-hidden border-b bg-muted">
                                    <img
                                        src={project.coverImage}
                                        alt={project.title}
                                        className="h-full w-full object-cover transition-transform hover:scale-105"
                                    />
                                </div>
                            )}
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div className="w-10 h-10 bg-primary/10 flex items-center justify-center text-primary mb-4">
                                        <LayoutGrid size={20} />
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon" className="h-8 w-8" asChild title="Edit Project">
                                            <Link href={`/dashboard/projects/${(project._id as any).toString()}/edit`}>
                                                <Pencil size={16} />
                                            </Link>
                                        </Button>
                                        {project.githubUrl && (
                                            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                                                <a href={project.githubUrl} target="_blank" rel="noreferrer">
                                                    <Github size={16} />
                                                </a>
                                            </Button>
                                        )}
                                        {project.liveUrl && (
                                            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                                                <a href={project.liveUrl} target="_blank" rel="noreferrer">
                                                    <ExternalLink size={16} />
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CardTitle className="text-xl">{project.title}</CardTitle>
                                    {project.status === "draft" && (
                                        <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-800 text-[10px] font-bold uppercase rounded">Draft</span>
                                    )}
                                </div>
                                <CardDescription className="line-clamp-2">
                                    {project.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="mt-auto pt-0">
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {project.techStack.map(tag => (
                                        <span key={tag} className="px-2 py-0.5 bg-muted text-[10px] font-bold uppercase tracking-wider">{tag}</span>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    <div className="border border-dashed flex flex-col items-center justify-center p-8 text-center space-y-4 min-h-[200px]">
                        <p className="text-muted-foreground">Got a new project to show off?</p>
                        <Button variant="outline" asChild size="sm">
                            <Link href="/dashboard/projects/new">Upload Project Details</Link>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
