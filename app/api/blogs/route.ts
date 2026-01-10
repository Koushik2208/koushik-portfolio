import { Blog } from "@/database";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { blogSchema } from "@/lib/validations";

export async function GET(req: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const status = searchParams.get("status");

        const query = status === "all" ? {} : { status: "published" };

        const blogs = await Blog.find(query)
            .sort({ publishedAt: -1, createdAt: -1 })
            .select("-content") // exclude heavy content for listing
            .lean();

        return NextResponse.json(
            { blogs },
            { status: 200 }
        );
    } catch (error) {
        console.error("Blog fetch error:", error);

        return NextResponse.json(
            { message: "Failed to fetch blogs" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();

        const parsed = blogSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { message: "Validation failed", errors: parsed.error.flatten() },
                { status: 400 }
            );
        }

        const blog = await Blog.create(parsed.data);

        return NextResponse.json(
            { message: "Blog created successfully", blog },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                message: "Blog creation failed",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}