"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { BlogForm, BlogFormValues } from "@/components/dashboard/BlogForm";
import { Loader2 } from "lucide-react";

export default function EditBlogPage({ params }: { params: Promise<{ blogId: string }> }) {
    const router = useRouter();
    const { blogId } = React.use(params);

    const [loading, setLoading] = React.useState(true);
    const [blog, setBlog] = React.useState<any>(null);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    React.useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`/api/blogs/${blogId}`);
                if (!response.ok) throw new Error("Failed to fetch blog");
                const data = await response.json();
                setBlog(data.blog);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (blogId) {
            fetchBlog();
        }
    }, [blogId]);

    async function onSubmit(data: BlogFormValues) {
        setIsSubmitting(true);
        try {
            const response = await fetch(`/api/blogs/${blogId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to update blog");
            }

            router.push("/dashboard/blogs");
            router.refresh();
        } catch (error) {
            console.error(error);
            alert(error instanceof Error ? error.message : "Failed to update blog.");
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
        <BlogForm
            defaultValues={blog}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            title="Edit Blog"
            description="Update your thoughts and information."
        />
    );
}
