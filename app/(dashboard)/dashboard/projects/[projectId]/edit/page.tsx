"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ProjectForm, ProjectFormValues } from "@/components/dashboard/ProjectForm";
import { Loader2 } from "lucide-react";

export default function EditProjectPage({ params }: { params: Promise<{ projectId: string }> }) {
    const router = useRouter();
    const { projectId } = React.use(params);

    const [loading, setLoading] = React.useState(true);
    const [project, setProject] = React.useState<any>(null);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    React.useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(`/api/projects/${projectId}`);
                if (!response.ok) throw new Error("Failed to fetch project");
                const data = await response.json();
                setProject(data.project);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (projectId) {
            fetchProject();
        }
    }, [projectId]);

    async function onSubmit(data: ProjectFormValues) {
        setIsSubmitting(true);
        try {
            const response = await fetch(`/api/projects/${projectId}`, {
                method: "PATCH", // or PUT
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to update project");
            }

            router.push("/dashboard/projects");
            router.refresh();
        } catch (error) {
            console.error(error);
            alert(error instanceof Error ? error.message : "Failed to update project.");
        } finally {
            setIsSubmitting(false);
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-primary" size={40} />
            </div>
        );
    }

    return (
        <ProjectForm
            defaultValues={project}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            title="Edit Project"
            description="Update your project details and information."
        />
    );
}