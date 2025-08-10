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
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        callId,
        callStartedAt: new Date(), // Track when call was initiated
      },
      { new: true } // Return updated document
    );

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

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

Please note: Your mentor is preparing the call. You may need to wait a moment for the connection to establish.

See you there!`,
      html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
      <h2>Hello 👋,</h2>
      <p>Your mentorship session with <strong>your mentor</strong> has just started.</p>
      <p>Click the button below to join the call:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="http://guildly/Mentorship/call/${callId}"
           style="display: inline-block; padding: 15px 30px; background-color: #3B82F6; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
          Join Call
        </a>
      </div>
      <div style="background-color: #F3F4F6; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <h4 style="margin: 0 0 10px 0; color: #374151;">📝 Important Note:</h4>
        <p style="margin: 0; color: #6B7280; font-size: 14px;">
          Your mentor is setting up the call. If you see a "waiting" message when you join, 
          this is normal - the connection will establish automatically once your mentor is ready.
        </p>
      </div>
      <p style="margin-top: 20px;">Good luck with your session!<br/>– The Mentorship Team</p>
    </div>
  `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully to:", booking.menteeEmail);
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
      // Don't fail the entire request if email fails
    }

    return NextResponse.json(
      { 
        details: "callId updated successfully",
        callId: callId,
        message: "Call initiated and mentee notified"
      },
      { status: 200 }
    );
  } catch (err) {
    console.log("Error in PATCH /api/booking:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
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

    const booking = await Booking.findById(bookingId).select("callId mentorId menteeId");

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    if (!booking.callId) {
      return NextResponse.json(
        { error: "callId doesn't exist" },
        { status: 400 }
      );
    }

    return NextResponse.json({ 
      data: {
        callId: booking.callId,
        mentorId: booking.mentorId,
        menteeId: booking.menteeId
      }
    }, { status: 200 });
  } catch (err) {
    console.error("Error in GET /api/booking:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};