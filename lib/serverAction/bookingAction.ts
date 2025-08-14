// lib/db/fetchBookings.ts
import { Booking } from "@/models/Booking.model";
import { User } from "@/models/user.model";
import { auth } from "@clerk/nextjs/server";

export async function fetchMentorBookings() {
  try {

    const {userId}=auth();
    if (!userId) {
      console.warn("[fetchBookings] Missing userId");
      return [];
    }

    // Get mentor profile ID
    const mentorData = await User.findOne({ userId })
      .select("profileId")
      .lean();

    if (!mentorData?.profileId) {
      console.warn(`[fetchBookings] Mentor not found for userId: ${userId}`);
      return [];
    }

    // Fetch bookings
    const bookingsRaw = await Booking.find({ mentorId: mentorData.profileId })
      .select("_id date time Duration sessionAmount menteeId")
      .populate({
        path: "menteeId",
        select: "userId firstName lastName profilePhoto",
        model: "User",
      })
      .lean();

    if (!bookingsRaw.length) {
      console.info(
        `[fetchBookings] No bookings found for mentorId: ${mentorData.profileId}`
      );
      return [];
    }

    const today = new Date();

    // Sort bookings: future first, then by date
    bookingsRaw.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      const isFutureA = dateA >= today;
      const isFutureB = dateB >= today;

      if (isFutureA && !isFutureB) return -1;
      if (!isFutureA && isFutureB) return 1;
      return dateA.getTime() - dateB.getTime();
    });

    // Limit to top 5 and format output
    return bookingsRaw.slice(0, 5).map((booking) => ({
      id: booking.mentorId?.userId || null,
      bookingId: booking._id.toString(),
      date: booking.date instanceof Date ? booking.date.toISOString() : booking.date,
      time: booking.time,
      Duration: booking.Duration,
      sessionAmount: booking.sessionAmount,
      firstName: booking.menteeId?.firstName || "",
      lastName: booking.menteeId?.lastName || "",
      profilePhoto: booking.menteeId?.profilePhoto || "",
      Role: booking.menteeId?.Role || "",
      CompanyName: booking.menteeId?.CompanyName || "",
      Rating: booking.menteeId?.Rating || 0,
    }));
  } catch (error) {
    console.error("[fetchBookings] Error fetching bookings:", error);
    return [];
  }
}



export async function fetchMenteeBookings() {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }

    // await Profile.findOne({});

    const user = await User.findOne({ userId }).select("_id");

    if (!user) {
      throw new Error("User not found");
    }

    const bookingsRaw = await Booking.find({ menteeId: user })
      .select("_id date time Duration sessionAmount")
      .populate({
        path: "mentorId",
        select:
          "userId firstName lastName profilePhoto CompanyName Role Rating",
        model: "Profile",
      })
      .lean();

    // Sort by upcoming first, then by datetime
    bookingsRaw.sort((a, b) => {
      const now = new Date();

      const getDateTime = (booking: any) => {
        const dateStr = new Date(booking.date).toISOString().split("T")[0];
        return new Date(`${dateStr} ${booking.time}`);
      };

      const dateTimeA = getDateTime(a);
      const dateTimeB = getDateTime(b);

      const isUpcomingA = dateTimeA >= now;
      const isUpcomingB = dateTimeB >= now;

      if (isUpcomingA && !isUpcomingB) return -1;
      if (!isUpcomingA && isUpcomingB) return 1;

      return dateTimeA.getTime() - dateTimeB.getTime();
    });

    // Limit and format results
    return bookingsRaw.slice(0, 5).map((booking) => ({
      id: booking.mentorId?.userId,
      bookingId: booking._id.toString(),
      date: booking.date instanceof Date ? booking.date.toISOString() : booking.date,
      time: booking.time,
      Duration: booking.Duration,
      sessionAmount: booking.sessionAmount,
      firstName: booking.mentorId?.firstName || "",
      lastName: booking.mentorId?.lastName || "",
      profilePhoto: booking.mentorId?.profilePhoto || "",
      Role: booking.mentorId?.Role || "",
      CompanyName: booking.mentorId?.CompanyName || "",
      Rating: booking.mentorId?.Rating || 0,
    }));
  } catch (error) {
    console.error("[fetchUserBookings] Error:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch bookings"
    );
  }
}
