import Link from "next/link";
import type { Metadata, ResolvingMetadata } from 'next'
import { ArrowLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IBlog } from "@/database/blog.model";
import { notFound } from "next/navigation";

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
    const slug = (await params).slug
    const blog = await getBlog(slug);

    if (!blog) {
        return {
            title: 'Blog Not Found',
            description: 'The requested blog post could not be found.',
        }
    }

    return {
        title: blog.title,
        description: blog.excerpt || blog.title, // Use excerpt if available
        openGraph: {
            title: blog.title,
            description: blog.excerpt || blog.title,
            type: 'article',
            publishedTime: blog.publishedAt ? new Date(blog.publishedAt).toISOString() : new Date(blog.createdAt).toISOString(),
            authors: ['Koushik Gorre'], // Hardcoded or from blog.author
            images: blog.coverImage ? [
                {
                    url: blog.coverImage,
                    width: 1200,
                    height: 630,
                    alt: blog.title,
                },
            ] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: blog.title,
            description: blog.excerpt || blog.title,
            images: blog.coverImage ? [blog.coverImage] : [],
        }
    }
}

async function getBlog(slug: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/blogs/${slug}`, {
            next: { revalidate: 60 }
        });

        if (!res.ok) return null;

        const data = await res.json();
        return data.blog || null;
    } catch (error) {
        console.error("Failed to fetch blog:", error);
        return null;
    }
}

export default async function BlogDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const blog: IBlog | null = await getBlog(slug);

    if (!blog) {
        notFound();
    }

    return (
        <main className="blog-content-wrapper min-h-screen pb-20">
            {/* Hero / Header */}
            <div className="border-b pt-32 pb-20">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 2xl:px-24">
                    <div className="max-w-4xl mx-auto">
                        <Button variant="ghost" size="sm" asChild className="mb-12 -ml-4 text-muted-foreground hover:text-foreground">
                            <Link href="/blog">
                                <ArrowLeft size={16} className="mr-2" /> Back to Writing
                            </Link>
                        </Button>

                        <div className="flex items-center gap-4 mb-8 text-sm text-muted-foreground font-inter">
                            <span className="flex items-center gap-1 bg-background border px-3 py-1 rounded-full">
                                <Calendar size={12} />
                                {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-12 leading-[1.1] text-foreground tracking-tighter">
                            {blog.title}
                        </h1>

                        {blog.tags && blog.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-8">
                                {blog.tags.map(tag => (
                                    <span key={tag} className="text-sm font-medium text-primary bg-primary/10 px-4 py-1.5 rounded-full">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 2xl:px-24 py-20">
                <div className="max-w-4xl mx-auto">
                    {blog.coverImage && (
                        <div className="rounded-2xl overflow-hidden border shadow-sm mb-20 aspect-video bg-muted relative">
                            <img
                                src={blog.coverImage}
                                alt={blog.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12 lg:p-16 shadow-xl">
                        <article
                            className="blog prose dark:prose-invert prose-xl max-w-none font-inter prose-headings:text-foreground prose-p:text-xl prose-p:leading-relaxed prose-a:text-primary"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}