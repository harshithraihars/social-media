"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  DollarSign,
  Star,
  MapPin,
  Video,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { BookingI } from "../../navigation/MentorShipHeader";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface BookingCardProps {
  booking: BookingI;
}

export const BookingCard = ({ booking }: BookingCardProps) => {
  const router = useRouter();
  const [callNotStarted, setCallNotStarted] = useState<string | null>(null);
  const [isCheckingCall, setIsCheckingCall] = useState(false);

  const calculateTimePercentage = (date: string) => {
    const bookingDate = new Date(date);
    const now = new Date();

    bookingDate.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    const totalDuration = 7 * 24 * 60 * 60 * 1000;
    const startDate = new Date(bookingDate.getTime() - totalDuration);

    if (now >= bookingDate) return 100;
    if (now <= startDate) return 0;

    const elapsed = now.getTime() - startDate.getTime();
    return Math.floor((elapsed / totalDuration) * 100);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    }
  };

  const now = new Date();
  const combinedDateString=`${booking.date.split("T")[0]} ${booking.time}`
  const bookingDate=new Date(combinedDateString)
  const bookingcompleted = bookingDate < now;

  const handleJoinClick = async () => {
    try {
      setIsCheckingCall(true);
      setCallNotStarted(null);

      const res = await axios.get(`api/booking/${booking.bookingId}`);
      const callId = res.data.data.callId;
      if (!callId) {
        setCallNotStarted(
          "Session hasn't started yet. Please wait for your mentor to begin the call."
        );
        setTimeout(() => {
          setCallNotStarted(null);
        }, 5000);
      } else {
        router.push(`/Mentorship/call/${callId}`);
      }
    } catch (error) {
      console.error("Error checking call status:", error);
      setCallNotStarted("Unable to check call status. Please try again.");
      setTimeout(() => {
        setCallNotStarted(null);
      }, 3000);
    } finally {
      setIsCheckingCall(false);
    }
  };

  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group bg-gradient-to-br to-gray-700 border-l-4 border-l-primary/70">
      <CardHeader className="py-3 px-4">
        <div className="flex justify-between items-start gap-2">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-12 w-12 border-2 border-primary/10 shadow-sm">
                <AvatarImage
                  src={booking.profilePhoto}
                  alt={booking.firstName}
                />
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5 text-primary font-medium">
                  {booking.firstName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                <div
                  className={`w-4 h-4 rounded-full ${
                    bookingcompleted ? "bg-green-500" : "bg-blue-500"
                  }`}
                ></div>
              </div>
            </div>
            <div>
              <CardTitle className="text-base flex items-center gap-1 font-semibold">
                {booking.firstName} {booking.lastName}
                <div className="flex items-center text-amber-500 text-xs ml-1">
                  <Star className="h-3 w-3 fill-amber-500 stroke-amber-500" />
                  <span className="ml-0.5">{booking.Rating}</span>
                </div>
              </CardTitle>
              <CardDescription className="text-xs font-medium text-primary/80">
                {booking.Role} at {booking.CompanyName}
              </CardDescription>
            </div>
          </div>
          <Badge
            variant={bookingcompleted ? "secondary" : "default"}
            className={`${
              bookingcompleted
                ? "bg-green-100 text-green-800 hover:bg-green-200"
                : "bg-blue-100 text-blue-800 hover:bg-blue-200"
            } text-xs py-0.5 px-2 rounded-full transition-all`}
          >
            {bookingcompleted ? "Completed" : "Upcoming"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="py-0 px-4">
        <div className="space-y-2 pb-3">
          <div className="bg-gray-50 rounded-md p-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">
                {formatDate(booking.date)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{booking.time}</span>
            </div>
            <span className="text-xs text-gray-500">
              {booking.Duration} min
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-gray-500" />
              <span className="text-gray-600 text-xs">Virtual Meeting</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-3.5 w-3.5 text-green-500" />
              <span className="font-medium text-gray-700">
                ${booking.sessionAmount}
              </span>
            </div>
          </div>

          {!bookingcompleted && (
            <div className="pt-1">
              <div className="flex justify-between text-xs mb-1"></div>
              <Progress
                value={calculateTimePercentage(booking.date)}
                className="h-1.5 bg-primary/5"
              />
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="px-4 py-2 bg-gray-50 border-t">
        <div className="w-full flex flex-col gap-2">
          {bookingcompleted ? (
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <MessageSquare className="h-3.5 w-3.5 text-gray-500 mr-1" />
                <span className="text-xs text-gray-500">Review session</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-7 rounded-full"
              >
                Book Again
              </Button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs h-7 rounded-full flex items-center gap-1 px-2"
                  >
                    <MessageSquare className="h-3 w-3" />
                    Message
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs h-7 rounded-full flex items-center gap-1 px-2"
                  >
                    <Clock className="h-3 w-3" />
                    Reschedule
                  </Button>
                </div>
                <Button
                  variant="default"
                  size="sm"
                  className="text-xs h-7 rounded-full bg-primary hover:bg-primary/90 flex items-center gap-1"
                  onClick={handleJoinClick}
                  disabled={isCheckingCall}
                >
                  <Video className="h-3 w-3" />
                  {isCheckingCall ? "Checking..." : "join"}
                </Button>
              </div>

              {/* Call not started message */}
              <AnimatePresence>
                {callNotStarted && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-2 border-t border-orange-200 mt-2"
                  >
                    <div className="flex gap-2 items-center bg-orange-50 border border-orange-200 rounded-md p-2">
                      <AlertCircle className="h-4 w-4 text-orange-500 flex-shrink-0" />
                      <span className="text-xs text-orange-700 font-medium">
                        {callNotStarted}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
