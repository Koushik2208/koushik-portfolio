"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { BlogForm, BlogFormValues } from "@/components/dashboard/BlogForm";

export default function CreateBlogPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    async function onSubmit(data: BlogFormValues) {
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/blogs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to create blog post");
            }

            router.push("/dashboard/blogs");
            router.refresh();
        } catch (error) {
            console.error(error);
            alert(error instanceof Error ? error.message : "Failed to create blog post.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <BlogForm
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            title="Create New Blog"
            description="Share your thoughts with the world."
        />
    );
}