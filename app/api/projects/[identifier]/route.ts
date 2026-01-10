import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Project } from "@/database";
import mongoose from "mongoose";
import { projectSchema } from "@/lib/validations";

export async function GET(
  req: NextRequest,
  { params }: { params: { identifier: string } }
) {
  try {
    await connectDB();

    const { identifier } = await params;
    console.log("Fetching project with identifier:", identifier);

    let project;

    // Check if identifier is a valid Mongo ObjectId
    if (mongoose.Types.ObjectId.isValid(identifier)) {
        console.log("Valid ObjectId detected");
      project = await Project.findById(identifier);
    } else {
        console.log("Searching by slug");
      project = await Project.findOne({ slug: identifier });
    }

    console.log("Project found:", !!project);

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Project fetched successfully", project },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch project",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { identifier: string } }
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

    const parsed = projectSchema.partial().safeParse(body);

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

    const updatedProject = await Project.findOneAndUpdate(
      query,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProject) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Project updated successfully",
        project: updatedProject,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Project update failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
