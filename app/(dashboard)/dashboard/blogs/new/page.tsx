"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, Resolver, useForm } from "react-hook-form";
import { blogSchema } from "@/lib/validations";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/dashboard/ImageUpload";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Tiptap from "@/components/text-editor";
import { Save, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

type BlogFormValues = z.infer<typeof blogSchema>;

export default function CreateBlogPage() {
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const form = useForm<BlogFormValues>({
        resolver: zodResolver(blogSchema) as Resolver<BlogFormValues>,
        defaultValues: {
            title: "",
            excerpt: "",
            content: "",
            tags: [],
            status: "draft",
            coverImage: "",
        },
    });

    async function onSubmit(data: BlogFormValues) {
        setIsSubmitting(true);
        try {
            console.log("Submitting blog data:", data);
            // TODO: Implement actual save logic (Server Action)
            await new Promise((resolve) => setTimeout(resolve, 1500));
            alert("Blog created successfully! (Check console for data)");
        } catch (error) {
            console.error(error);
            alert("Failed to create blog.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/dashboard/blogs">
                        <ArrowLeft size={16} className="mr-2" /> Back
                    </Link>
                </Button>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card className="rounded-none border-none shadow-sm">
                    <CardHeader className="border-b bg-muted/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-2xl font-bold font-inter">Create New Blog</CardTitle>
                                <CardDescription>Share your thoughts with the world.</CardDescription>
                            </div>
                            <div className="flex gap-3">
                                <Controller
                                    name="status"
                                    control={form.control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className="w-32">
                                                <SelectValue placeholder="Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="draft">Draft</SelectItem>
                                                <SelectItem value="published">Published</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                <Button type="submit" disabled={isSubmitting} className="font-inter px-6">
                                    {isSubmitting ? (
                                        <Loader2 size={18} className="mr-2 animate-spin" />
                                    ) : (
                                        <Save size={18} className="mr-2" />
                                    )}
                                    Save Post
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-8">
                        <FieldGroup className="space-y-8">
                            {/* Cover Image Field */}
                            <Controller
                                name="coverImage"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <ImageUpload
                                            value={field.value}
                                            onChange={field.onChange}
                                            label="COVER IMAGE"
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            {/* Title Field */}
                            <Controller
                                name="title"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="blog-title" className="text-sm font-bold font-inter uppercase tracking-wider text-muted-foreground">TITLE</FieldLabel>
                                        <Input
                                            {...field}
                                            id="blog-title"
                                            placeholder="The Future of Web Development..."
                                            className="h-12 text-lg font-cormorant"
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            {/* Excerpt Field */}
                            <Controller
                                name="excerpt"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="blog-excerpt" className="text-sm font-bold font-inter uppercase tracking-wider text-muted-foreground">SUMMARY / EXCERPT</FieldLabel>
                                        <Textarea
                                            {...field}
                                            id="blog-excerpt"
                                            placeholder="A brief overview of what this post is about..."
                                            className="font-inter"
                                            rows={3}
                                        />
                                        <FieldDescription>This will be shown on the blog listing page.</FieldDescription>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Tags Field */}
                                <Controller
                                    name="tags"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="blog-tags" className="text-sm font-bold font-inter uppercase tracking-wider text-muted-foreground">TAGS</FieldLabel>
                                            <Input
                                                {...field}
                                                value={field.value?.join(", ") || ""}
                                                onChange={(e) => field.onChange(e.target.value.split(",").map(t => t.trim()).filter(Boolean))}
                                                id="blog-tags"
                                                placeholder="react, tailwind, nextjs"
                                                className="font-inter"
                                            />
                                            <FieldDescription>Separate tags with commas.</FieldDescription>
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                            </div>

                            {/* Content Field */}
                            <Controller
                                name="content"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel className="text-sm font-bold font-inter uppercase tracking-wider text-muted-foreground">CONTENT</FieldLabel>
                                        <Tiptap
                                            content={field.value}
                                            onChange={field.onChange}
                                            output="json"
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                    </CardContent>
                    <CardFooter className="bg-muted/10 border-t p-6 flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={() => form.reset()} className="font-inter">
                            Discard Changes
                        </Button>
                        <Button type="submit" disabled={isSubmitting} className="font-inter px-8">
                            {isSubmitting ? "Saving..." : "Save Blog Post"}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}