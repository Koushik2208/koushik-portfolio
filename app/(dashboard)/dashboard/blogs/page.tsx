"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, ExternalLink, Pencil, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { IBlog } from "@/database/blog.model";

export default function DashboardBlogsPage() {
    const [blogs, setBlogs] = useState<IBlog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch("/api/blogs?status=all");
                const data = await response.json();
                setBlogs(data.blogs || []);
            } catch (error) {
                console.error("Failed to fetch blogs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Blogs</h1>
                    <p className="text-muted-foreground">Manage your articles and writing journey.</p>
                </div>
                <Button asChild className="group">
                    <Link href="/dashboard/blogs/new">
                        New Post
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
                    {blogs.map((blog) => (
                        <Card key={(blog._id as any).toString()} className="hover:shadow-md transition-shadow flex flex-col font-inter overflow-hidden">
                            {blog.coverImage && (
                                <div className="aspect-video w-full overflow-hidden border-b bg-muted">
                                    <img
                                        src={blog.coverImage}
                                        alt={blog.title}
                                        className="h-full w-full object-cover transition-transform hover:scale-105"
                                    />
                                </div>
                            )}
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div className="w-10 h-10 bg-primary/10 flex items-center justify-center text-primary mb-4">
                                        <FileText size={20} />
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon" className="h-8 w-8" asChild title="Edit Blog">
                                            <Link href={`/dashboard/blogs/${(blog._id as any).toString()}/edit`}>
                                                <Pencil size={16} />
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8" asChild title="View Live">
                                            <Link href={`/blogs/${blog.slug}`} target="_blank">
                                                <ExternalLink size={16} />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CardTitle className="text-xl">{blog.title}</CardTitle>
                                    {blog.status === "draft" && (
                                        <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-800 text-[10px] font-bold uppercase rounded">Draft</span>
                                    )}
                                </div>
                                <CardDescription className="line-clamp-2">
                                    {blog.excerpt}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="mt-auto pt-0">
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {blog.tags?.map(tag => (
                                        <span key={tag} className="px-2 py-0.5 bg-muted text-[10px] font-bold uppercase tracking-wider">{tag}</span>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    <div className="border border-dashed flex flex-col items-center justify-center p-8 text-center space-y-4 min-h-[200px]">
                        <p className="text-muted-foreground">Ready to share something new?</p>
                        <Button variant="outline" asChild size="sm">
                            <Link href="/dashboard/blogs/new">Create your next masterpiece</Link>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
