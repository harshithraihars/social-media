import { MentorComments } from "@/models/MentorComment.model";
import { IProfile, Profile } from "@/models/profile.model";
import { User } from "@/models/user.model";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { mentorId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { mentorId } = params;

    if (!mentorId) {
      return NextResponse.json(
        { details: "MentorId not provided" },
        { status: 400 }
      );
    }
    const Comments = await MentorComments.find({ mentorId: mentorId })
      .populate({
        path: "menteeId",
        select: "firstName lastName",
      })
      .lean();

    const formattedComments = Comments.map((comment) => ({
      comment: comment.comment,
      firstName: comment.menteeId?.firstName,
      lastName: comment.menteeId?.lastName,
    }));

    return NextResponse.json({ success: true,data:formattedComments }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
};
