"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ProjectForm, ProjectFormValues } from "@/components/dashboard/ProjectForm";

export default function CreateProjectPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    async function onSubmit(data: ProjectFormValues) {
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to create project");
            }

            router.push("/dashboard/projects");
            router.refresh();
        } catch (error) {
            console.error(error);
            alert(error instanceof Error ? error.message : "Failed to create project.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <ProjectForm
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            title="Create New Project"
            description="Showcase your work and achievements."
        />
    );
}