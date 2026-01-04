"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, Resolver, useForm } from "react-hook-form";
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
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { projectSchema } from "@/lib/validations";

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function CreateProjectPage() {
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema) as Resolver<ProjectFormValues>,
        defaultValues: {
            title: "",
            description: "",
            content: "",
            techStack: [],
            status: "published",
            featured: false,
            coverImage: "",
            githubUrl: "",
            liveUrl: "",
        },
    });

    async function onSubmit(data: ProjectFormValues) {
        setIsSubmitting(true);
        try {
            console.log("Submitting project data:", data);
            // TODO: Implement actual save logic (Server Action)
            await new Promise((resolve) => setTimeout(resolve, 1500));
            alert("Project created successfully! (Check console for data)");
        } catch (error) {
            console.error(error);
            alert("Failed to create project.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/dashboard/projects">
                        <ArrowLeft size={16} className="mr-2" /> Back
                    </Link>
                </Button>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card className="rounded-none border-none shadow-sm">
                    <CardHeader className="border-b bg-muted/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-2xl font-bold font-inter">Create New Project</CardTitle>
                                <CardDescription>Showcase your work and achievements.</CardDescription>
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
                                    Save Project
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
                                        <FieldLabel htmlFor="project-title" className="text-sm font-bold font-inter uppercase tracking-wider text-muted-foreground">TITLE</FieldLabel>
                                        <Input
                                            {...field}
                                            id="project-title"
                                            placeholder="My Awesome Project..."
                                            className="h-12 text-lg font-cormorant"
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            {/* Description Field */}
                            <Controller
                                name="description"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="project-description" className="text-sm font-bold font-inter uppercase tracking-wider text-muted-foreground">DESCRIPTION</FieldLabel>
                                        <Textarea
                                            {...field}
                                            id="project-description"
                                            placeholder="A brief overview of what this project does and its key features..."
                                            className="font-inter"
                                            rows={4}
                                        />
                                        <FieldDescription>This will be shown on the project listing page.</FieldDescription>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Tech Stack Field */}
                                <Controller
                                    name="techStack"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="project-techstack" className="text-sm font-bold font-inter uppercase tracking-wider text-muted-foreground">TECH STACK</FieldLabel>
                                            <Input
                                                {...field}
                                                value={field.value?.join(", ") || ""}
                                                onChange={(e) => field.onChange(e.target.value.split(",").map(t => t.trim()).filter(Boolean))}
                                                id="project-techstack"
                                                placeholder="React, TypeScript, Node.js"
                                                className="font-inter"
                                            />
                                            <FieldDescription>Separate technologies with commas.</FieldDescription>
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />

                                {/* Featured Checkbox */}
                                <Controller
                                    name="featured"
                                    control={form.control}
                                    render={({ field }) => (
                                        <Field>
                                            <FieldLabel className="text-sm font-bold font-inter uppercase tracking-wider text-muted-foreground">OPTIONS</FieldLabel>
                                            <div className="flex items-center space-x-2 h-10">
                                                <Checkbox
                                                    id="project-featured"
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                                <label
                                                    htmlFor="project-featured"
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                                >
                                                    Featured Project
                                                </label>
                                            </div>
                                            <FieldDescription>Featured projects appear prominently on your portfolio.</FieldDescription>
                                        </Field>
                                    )}
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                {/* GitHub URL Field */}
                                <Controller
                                    name="githubUrl"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="project-github" className="text-sm font-bold font-inter uppercase tracking-wider text-muted-foreground">GITHUB URL</FieldLabel>
                                            <Input
                                                {...field}
                                                id="project-github"
                                                placeholder="https://github.com/username/project"
                                                className="font-inter"
                                            />
                                            <FieldDescription>Link to the source code repository.</FieldDescription>
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />

                                {/* Live URL Field */}
                                <Controller
                                    name="liveUrl"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="project-live" className="text-sm font-bold font-inter uppercase tracking-wider text-muted-foreground">LIVE URL</FieldLabel>
                                            <Input
                                                {...field}
                                                id="project-live"
                                                placeholder="https://myproject.com"
                                                className="font-inter"
                                            />
                                            <FieldDescription>Link to the live deployment.</FieldDescription>
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
                                        <FieldLabel className="text-sm font-bold font-inter uppercase tracking-wider text-muted-foreground">DETAILED CONTENT (OPTIONAL)</FieldLabel>
                                        <Tiptap
                                            content={field.value}
                                            onChange={field.onChange}
                                            output="json"
                                        />
                                        <FieldDescription>Add a detailed write-up about your project, implementation details, challenges, etc.</FieldDescription>
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
                            {isSubmitting ? "Saving..." : "Save Project"}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}