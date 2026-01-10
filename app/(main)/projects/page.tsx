import Section from "@/components/portfolio/Section";
import ProjectCard from "@/components/portfolio/ProjectCard";
import { IProject } from "@/database/project.model";

async function getProjects() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/projects?status=published`, {
            next: { revalidate: 60 }
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.projects || [];
    } catch (error) {
        console.error("Failed to fetch projects:", error);
        return [];
    }
}

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <main className="min-h-screen">
            <Section id="projects" title="Featured Projects" subtitle="A collection of web and mobile applications I've built.">
                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
                    {projects.map((project: IProject) => (
                        <ProjectCard
                            key={(project._id as any).toString()}
                            title={project.title}
                            description={project.description}
                            tags={project.techStack}
                            image={project.coverImage}
                            githubUrl={project.githubUrl}
                            liveUrl={project.liveUrl}
                            slug={project.slug}
                        />
                    ))}
                    {projects.length === 0 && (
                        <div className="col-span-2 text-center py-20 text-muted-foreground">
                            <p>No projects published yet.</p>
                        </div>
                    )}
                </div>
            </Section>
        </main>
    );
}
