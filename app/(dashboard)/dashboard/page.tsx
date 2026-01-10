"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, LayoutGrid, TrendingUp, Calendar, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";

export default function DashboardOverviewPage() {
    const [stats, setStats] = useState({ blogs: 0, projects: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [blogsRes, projectsRes] = await Promise.all([
                    fetch("/api/blogs?status=all"),
                    fetch("/api/projects?status=all")
                ]);
                const blogsData = await blogsRes.json();
                const projectsData = await projectsRes.json();

                setStats({
                    blogs: blogsData.blogs?.length || 0,
                    projects: projectsData.projects?.length || 0
                });
            } catch (error) {
                console.error("Failed to fetch stats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const currentHour = new Date().getHours();
    const greeting = currentHour < 12 ? "Good Morning" : currentHour < 18 ? "Good Afternoon" : "Good Evening";

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-lg bg-linear-to-br from-primary/10 via-primary/5 to-background border p-8 md:p-12">
                <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-6 w-6 text-primary animate-pulse" />
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                            {greeting}, Boss
                        </h1>
                    </div>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        Your creative command center. Craft compelling stories, showcase powerful projects,
                        and build your digital empire — all from one place.
                    </p>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/3 rounded-full blur-2xl" />
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-l-4 border-l-primary/50 hover:shadow-md transition-shadow">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center">
                                <FileText className="h-6 w-6 text-primary" />
                            </div>
                            <TrendingUp className="h-5 w-5 text-green-500" />
                        </div>
                        <CardTitle className="text-3xl font-bold mt-4">
                            {loading ? "..." : stats.blogs}
                        </CardTitle>
                        <CardDescription>Blog Posts</CardDescription>
                    </CardHeader>
                </Card>

                <Card className="border-l-4 border-l-blue-500/50 hover:shadow-md transition-shadow">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-md flex items-center justify-center">
                                <LayoutGrid className="h-6 w-6 text-blue-500" />
                            </div>
                            <TrendingUp className="h-5 w-5 text-green-500" />
                        </div>
                        <CardTitle className="text-3xl font-bold mt-4">
                            {loading ? "..." : stats.projects}
                        </CardTitle>
                        <CardDescription>Projects</CardDescription>
                    </CardHeader>
                </Card>

                <Card className="border-l-4 border-l-purple-500/50 hover:shadow-md transition-shadow">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="w-12 h-12 bg-purple-500/10 rounded-md flex items-center justify-center">
                                <Calendar className="h-6 w-6 text-purple-500" />
                            </div>
                        </div>
                        <CardTitle className="text-3xl font-bold mt-4">
                            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </CardTitle>
                        <CardDescription>Today's Date</CardDescription>
                    </CardHeader>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
                <Card className="group hover:shadow-lg transition-all hover:border-primary/50 cursor-pointer">
                    <Link href="/dashboard/blogs/new">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="text-xl flex items-center gap-2">
                                        <FileText className="h-5 w-5" />
                                        Write a New Blog
                                    </CardTitle>
                                    <CardDescription className="mt-2">
                                        Share your thoughts, insights, and stories with the world
                                    </CardDescription>
                                </div>
                                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                            </div>
                        </CardHeader>
                    </Link>
                </Card>

                <Card className="group hover:shadow-lg transition-all hover:border-primary/50 cursor-pointer">
                    <Link href="/dashboard/projects/new">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="text-xl flex items-center gap-2">
                                        <LayoutGrid className="h-5 w-5" />
                                        Add a New Project
                                    </CardTitle>
                                    <CardDescription className="mt-2">
                                        Showcase your latest work, innovations, and achievements
                                    </CardDescription>
                                </div>
                                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                            </div>
                        </CardHeader>
                    </Link>
                </Card>
            </div>

            {/* Inspiration Quote */}
            <Card className="bg-muted/30 border-dashed">
                <CardContent className="pt-6">
                    <blockquote className="space-y-2">
                        <p className="text-lg italic text-muted-foreground">
                            "The best time to plant a tree was 20 years ago. The second best time is now."
                        </p>
                        <footer className="text-sm text-muted-foreground">— Chinese Proverb</footer>
                    </blockquote>
                </CardContent>
            </Card>
        </div>
    );
}
