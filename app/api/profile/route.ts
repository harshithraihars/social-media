import { NextRequest, NextResponse } from "next/server";
import { Profile } from "@/models/profile.model";
import connectDB from "@/lib/db";
import { Rat } from "lucide-react";

export const PUT = async (req: NextRequest) => {
  try {
    await connectDB();
    const body = await req.json();

    const { CompanyName, Role, Skills, About, Rate, userId } = body;  
    console.log(CompanyName,Role,Skills,About,Rate,userId);
      
    if (
      !CompanyName ||
      !Role ||
      !Skills ||
      !About ||
      typeof Rate !== "number"
    ) {
      return NextResponse.json(
        { error: "All fields are required and must be valid." },
        { status: 400 }
      );
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { user: userId },
      { CompanyName, Role, Skills, About, Rate, user: userId },
      { upsert: true, new: true, runValidators: true }
    );

    return NextResponse.json({
      message: "Profile updated successfully.",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "An error occurred while updating the profile." },
      { status: 500 }
    );
  }
};


export const GET = async (req: NextRequest) => {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required." },
        { status: 400 }
      );
    }

    const userProfile = await Profile.findOne({ user: userId });

    if (!userProfile) {
      return NextResponse.json(
        { error: "Profile not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ profile: userProfile }, { status: 200 });
  } catch (error) {
    console.error("GET profile error:", error);
    return NextResponse.json(
      { error: "Something went wrong while fetching profile." },
      { status: 500 }
    );
  }
};
