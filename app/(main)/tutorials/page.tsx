import Section from "@/components/portfolio/Section";
import ProjectCard from "@/components/portfolio/ProjectCard";
import { IProject } from "@/database/project.model";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tutorials & Mini Projects | Koushik",
    description: "Focused, feature-driven mini projects and tutorials — bite-sized showcases of specific technologies and techniques.",
};

async function getMiniProjects() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/projects?status=published&type=mini`, {
            next: { revalidate: 60 }
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.projects || [];
    } catch (error) {
        console.error("Failed to fetch mini projects:", error);
        return [];
    }
}

export default async function TutorialsPage() {
    const miniProjects = await getMiniProjects();

    return (
        <main className="min-h-screen">
            <Section
                id="tutorials"
                title="Tutorials & Mini Projects"
                subtitle="Focused, feature-driven builds — each one explores a specific technology or technique in depth."
            >
                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
                    {miniProjects.map((project: IProject) => (
                        <ProjectCard
                            key={(project._id as any).toString()}
                            title={project.title}
                            description={project.description}
                            tags={project.techStack}
                            image={project.coverImage}
                            githubUrl={project.githubUrl}
                            liveUrl={project.liveUrl}
                            slug={project.slug}
                            basePath="/tutorials"
                        />
                    ))}
                    {miniProjects.length === 0 && (
                        <div className="col-span-2 text-center py-20 text-muted-foreground">
                            <p>Tutorials coming soon — stay tuned!</p>
                        </div>
                    )}
                </div>
            </Section>
        </main>
    );
}
