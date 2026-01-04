import Link from "next/link";
import { Plus, LayoutGrid, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";

export default function DashboardProjectsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Projects</h1>
                    <p className="text-muted-foreground">Showcase your best engineering work.</p>
                </div>
                <Button asChild>
                    <Link href="/dashboard/projects/new">
                        <Plus size={18} className="mr-2" /> Add Project
                    </Link>
                </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <Card className="hover:shadow-md transition-shadow flex flex-col font-inter">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div className="w-10 h-10 bg-primary/10 flex items-center justify-center text-primary mb-4">
                                <LayoutGrid size={20} />
                            </div>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Github size={16} />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <ExternalLink size={16} />
                                </Button>
                            </div>
                        </div>
                        <CardTitle className="text-xl">ContentGen Pro</CardTitle>
                        <CardDescription className="line-clamp-2">
                            AI-Powered Personal Branding Assistant that helps users generate and plan social media content.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto pt-0">
                        <div className="flex flex-wrap gap-2 mt-4">
                            {["Next.js", "Supabase", "OpenAI"].map(tag => (
                                <span key={tag} className="px-2 py-0.5 bg-muted text-[10px] font-bold uppercase tracking-wider">{tag}</span>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="border border-dashed flex flex-col items-center justify-center p-8 text-center space-y-4 min-h-[200px]">
                    <p className="text-muted-foreground">Got a new project to show off?</p>
                    <Button variant="outline" asChild size="sm">
                        <Link href="/dashboard/projects/new">Upload Project Details</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
