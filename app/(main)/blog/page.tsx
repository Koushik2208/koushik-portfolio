import Section from "@/components/portfolio/Section";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BlogPage() {
    const posts = [
        {
            title: "The Intersection of AI and Creativity",
            description: "How generative AI is changing the landscape for content creators and developers alike.",
            date: "Jan 03, 2026",
            category: "AI & Future"
        },
        {
            title: "Building Content-First Products",
            description: "Why the modern developer needs to think like a storyteller when building digital experiences.",
            date: "Dec 15, 2025",
            category: "Product Thinking"
        },
        {
            title: "Learning in Public: My 2025 Journey",
            description: "A reflection on a year of building projects, editing videos, and growing as a full-stack developer.",
            date: "Dec 30, 2025",
            category: "Personal Study"
        }
    ];

    return (
        <main className="min-h-screen">
            <Section id="blog" title="Writing & Creator Journey" subtitle="Thoughts on building, storytelling, and the future of technology.">
                <div className="grid md:grid-cols-1 gap-8 max-w-4xl mx-auto">
                    {posts.map((post, index) => (
                        <Card key={index} className="hover:shadow-md transition-shadow group font-inter">
                            <CardHeader>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-primary uppercase tracking-widest">{post.category}</span>
                                    <span className="text-xs text-muted-foreground">{post.date}</span>
                                </div>
                                <CardTitle className="text-2xl md:text-3xl font-bold font-cormorant group-hover:text-primary transition-colors">
                                    {post.title}
                                </CardTitle>
                                <CardDescription className="text-lg font-cormorant leading-relaxed">
                                    {post.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Link href="#" className="inline-flex items-center text-sm font-bold text-primary hover:underline">
                                    Read Full Story <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </Section>
        </main>
    );
}
