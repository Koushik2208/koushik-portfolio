import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Blog } from "@/database";
import mongoose from "mongoose";
import { blogSchema } from "@/lib/validations";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ identifier: string }> }
) {
    try {
        await connectDB();

        const { identifier } = await params;

        let blog;

        // Check if identifier is a valid Mongo ObjectId
        if (mongoose.Types.ObjectId.isValid(identifier)) {
            blog = await Blog.findById(identifier);
        } else {
            blog = await Blog.findOne({ slug: identifier });
        }

        if (!blog) {
            return NextResponse.json(
                { message: "Blog not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Blog fetched successfully", blog },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                message: "Failed to fetch blog",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ identifier: string }> }
) {
    try {
        await connectDB();

        const body = await req.json();

        if (!body || Object.keys(body).length === 0) {
            return NextResponse.json(
                { message: "No update data provided" },
                { status: 400 }
            );
        }

        const parsed = blogSchema.partial().safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { message: "Validation failed", errors: parsed.error.flatten() },
                { status: 400 }
            );
        }

        const updateData = parsed.data;

        const { identifier } = await params;

        const query = mongoose.Types.ObjectId.isValid(identifier)
            ? { _id: identifier }
            : { slug: identifier };

        const updatedBlog = await Blog.findOneAndUpdate(
            query,
            updateData,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedBlog) {
            return NextResponse.json(
                { message: "Blog not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: "Blog updated successfully",
                blog: updatedBlog,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                message: "Blog update failed",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
