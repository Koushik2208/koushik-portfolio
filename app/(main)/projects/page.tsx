import Section from "@/components/portfolio/Section";
import ProjectCard from "@/components/portfolio/ProjectCard";

export default function ProjectsPage() {
    const projects = [
        {
            title: "ContentGen Pro",
            description: "AI-Powered Personal Branding Assistant that helps users generate and plan social media content based on profession, tone, and audience.",
            tags: ["Next.js", "Supabase", "OpenAI API", "Tailwind CSS"]
        },
        {
            title: "Law Office Management System",
            description: "A comprehensive dashboard for managing lawyers, cases, and court hearings with advanced filtering and tracking.",
            tags: ["Next.js", "TypeScript", "MongoDB", "Dashboard"]
        },
        {
            title: "Mylaru Infra",
            description: "Marketing website with an admin dashboard for a construction company, featuring SEO optimization and dynamic content.",
            tags: ["Next.js", "SEO", "Admin Dashboard", "Marketing"]
        },
        // Add more projects here later
    ];

    return (
        <main className="min-h-screen">
            <Section id="projects" title="Featured Projects" subtitle="A collection of web and mobile applications I've built.">
                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} {...project} />
                    ))}
                </div>
            </Section>
        </main>
    );
}
