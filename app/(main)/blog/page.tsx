import Section from "@/components/portfolio/Section";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { IBlog } from "@/database/blog.model";

async function getBlogs() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/blogs?status=published`, {
            next: { revalidate: 60 }
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.blogs || [];
    } catch (error) {
        console.error("Failed to fetch blogs:", error);
        return [];
    }
}

export default async function BlogPage() {
    const posts = await getBlogs();

    return (
        <main className="min-h-screen">
            <Section id="blog" title="Writing & Creator Journey" subtitle="Thoughts on building, storytelling, and the future of technology.">
                <div className="grid md:grid-cols-1 gap-8 max-w-4xl mx-auto">
                    {posts.map((post: IBlog) => (
                        <Card key={(post._id as any).toString()} className="hover:shadow-md transition-shadow group font-inter">
                            <CardHeader>
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex gap-2">
                                        {post.tags.slice(0, 1).map(tag => (
                                            <span key={tag} className="text-xs font-bold text-primary uppercase tracking-widest">{tag}</span>
                                        ))}
                                    </div>
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Calendar size={12} />
                                        {new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                    </span>
                                </div>
                                <Link href={`/blog/${post.slug}`}>
                                    <CardTitle className="text-2xl md:text-3xl font-bold  group-hover:text-primary transition-colors cursor-pointer">
                                        {post.title}
                                    </CardTitle>
                                </Link>
                                <CardDescription className="text-lg  leading-relaxed mt-2">
                                    {post.excerpt}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-sm font-bold text-primary hover:underline">
                                    Read Full Story <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                    {posts.length === 0 && (
                        <div className="text-center py-20 text-muted-foreground">
                            <p>No posts published yet. Check back soon!</p>
                        </div>
                    )}
                </div>
            </Section>
        </main>
    );
}
