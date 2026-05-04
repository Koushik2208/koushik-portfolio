"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LayoutGrid, Blocks, ExternalLink, Github, Loader2, Pencil, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { IProject } from "@/database/project.model";
import { cn } from "@/lib/utils";

type FilterType = "all" | "main" | "mini";

export default function DashboardProjectsPage() {
    const [projects, setProjects] = useState<IProject[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<FilterType>("all");

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

    const filteredProjects = filter === "all"
        ? projects
        : projects.filter((p) => (p.projectType || "main") === filter);

    const tabs: { label: string; value: FilterType; count: number }[] = [
        { label: "All", value: "all", count: projects.length },
        { label: "Main Projects", value: "main", count: projects.filter((p) => !p.projectType || p.projectType === "main").length },
        { label: "Mini Projects", value: "mini", count: projects.filter((p) => p.projectType === "mini").length },
    ];

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

            {/* Filter Tabs */}
            <div className="flex gap-1 border-b">
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => setFilter(tab.value)}
                        className={cn(
                            "px-4 py-2.5 text-sm font-medium transition-all relative cursor-pointer",
                            filter === tab.value
                                ? "text-primary"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {tab.label}
                        <span className="ml-1.5 text-xs text-muted-foreground">({tab.count})</span>
                        {filter === tab.value && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                        )}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="animate-spin text-primary" size={40} />
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {filteredProjects.map((project) => (
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
                                    <div className={cn(
                                        "w-10 h-10 flex items-center justify-center mb-4",
                                        project.projectType === "mini"
                                            ? "bg-violet-500/10 text-violet-500"
                                            : "bg-primary/10 text-primary"
                                    )}>
                                        {project.projectType === "mini" ? <Blocks size={20} /> : <LayoutGrid size={20} />}
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
                                <div className="flex items-center gap-2 flex-wrap">
                                    <CardTitle className="text-xl">{project.title}</CardTitle>
                                    {project.projectType === "mini" && (
                                        <span className="px-1.5 py-0.5 bg-violet-100 text-violet-800 dark:bg-violet-500/20 dark:text-violet-300 text-[10px] font-bold uppercase rounded">Mini</span>
                                    )}
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
