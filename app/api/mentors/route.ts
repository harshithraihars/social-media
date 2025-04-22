import connectDB from "@/lib/db";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    console.log(searchParams);
    
    const CompanyName = searchParams.get("CompanyName");
    const Role = searchParams.get("Role");
    console.log(CompanyName);
    
    const pipeline: any[] = [
      { $match: { MentorshipEnabled: true } },
      {
        $lookup: {
          from: "profiles",
          localField: "userId",
          foreignField: "userId",
          as: "profile",
        },
      },
      { $unwind: "$profile" },
    ];

    if (CompanyName) {
      pipeline.push({
        $match: {
          "profile.CompanyName": {
            $regex: CompanyName,
            $options: "i", // case-insensitive match
          },
        },
      });
    }

    if (Role) {
      pipeline.push({
        $match: {
          "profile.Role": {
            $regex: Role,
            $options: "i", // case-insensitive match
          },
        },
      });
    }

    const mentors = await User.aggregate(pipeline);

    return NextResponse.json(mentors, { status: 200 });
  } catch (error) {
    console.error("Error fetching mentors:", error);
    return NextResponse.json(
      { message: "Failed to fetch mentors", error },
      { status: 500 }
    );
  }
};
