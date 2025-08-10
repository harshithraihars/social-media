import { Booking } from "@/models/Booking.model";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
export const PATCH = async (
  req: NextRequest,
  { params }: { params: { bookingId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId)
      return NextResponse.json({ error: "Un Authorized" }, { status: 401 });

    const { bookingId } = params;

    if (!bookingId)
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 }
      );

    const { callId } = await req.json();
    const booking = await Booking.findByIdAndUpdate(bookingId, {
      callId,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: booking.menteeEmail,
      subject: "Your mentorship session has started!",
      text: `Hi there,

Your mentor has just initiated your mentorship session. Click the link below to join the call:

https://guidly/call/${callId}

See you there!`,
      html: `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Hello 👋,</h2>
      <p>Your mentorship session with <strong>the Mentor</strong> has just started.</p>
      <p>Click the button below to join the call:</p>
      <a href="http://guildly/Mentorship/call/${callId}" 
         style="display: inline-block; padding: 12px 20px; background-color: black; color: white; text-decoration: none; border-radius: 5px;">
        Join Call
      </a>
      <p style="margin-top: 20px;">Good luck with your session!<br/>– The Mentorship Team</p>
    </div>
  `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { details: "callId updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err.message);
    
    return NextResponse.json({ error: err }, { status: 500 });
  }
};

export const GET = async (
  req: NextRequest,
  { params }: { params: { bookingId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId)
      return NextResponse.json({ error: "Un Authorized" }, { status: 401 });

    const { bookingId } = params;

    if (!bookingId)
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 }
      );

    const callId = await Booking.findById(bookingId).select("callId");

    if (!callId) {
      return NextResponse.json(
        { error: "callId doesn't exist" },
        { status: 400 }
      );
    }

    return NextResponse.json({ data: callId }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
};
