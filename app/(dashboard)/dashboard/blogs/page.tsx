import Link from "next/link";
import { Plus, FileText, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

export default function DashboardBlogsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Blogs</h1>
                    <p className="text-muted-foreground">Manage your articles and writing journey.</p>
                </div>
                <Button asChild>
                    <Link href="/dashboard/blogs/new">
                        <Plus size={18} className="mr-2" /> New Post
                    </Link>
                </Button>
            </div>

            <div className="grid gap-6">
                <Card className="hover:shadow-md transition-shadow">
                    <div className="p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 flex items-center justify-center text-primary">
                                <FileText size={24} />
                            </div>
                            <div>
                                <CardTitle className="text-xl">The Intersection of AI and Creativity</CardTitle>
                                <CardDescription>Published on Jan 03, 2026 • 5 min read</CardDescription>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon">
                            <MoreHorizontal size={20} />
                        </Button>
                    </div>
                </Card>

                <div className="border border-dashed p-12 text-center space-y-4">
                    <p className="text-muted-foreground">Ready to share something new?</p>
                    <Button variant="outline" asChild>
                        <Link href="/dashboard/blogs/new">Create your next masterpiece</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
