"use client";
export interface Booking {
    id: number;
    mentorName: string;
    mentorAvatar: string;
    mentorSpecialty: string;
    location: string;
    date: string;
    time: string;
    duration: number;
    amountPaid: number;
    completed: boolean;
    rating: number;
  }
  
  // Sample booking data - in a real app, this would come from an API
  export const bookings: Booking[] = [
    {
      id: 1,
      mentorName: "Dr. Sarah Johnson",
      mentorAvatar: "/placeholder.svg?height=40&width=40",
      mentorSpecialty: "Career Development",
      location: "Virtual Meeting",
      date: "2025-03-20",
      time: "14:00",
      duration: 60,
      amountPaid: 85,
      completed: false,
      rating: 4.9,
    },
    {
      id: 2,
      mentorName: "Prof. Michael Chen",
      mentorAvatar: "/placeholder.svg?height=40&width=40",
      mentorSpecialty: "Technical Interview Prep",
      location: "Office 3B, Tech Hub",
      date: "2025-03-18",
      time: "10:30",
      duration: 45,
      amountPaid: 65,
      completed: false,
      rating: 4.7,
    },
    {
      id: 3,
      mentorName: "Emma Williams",
      mentorAvatar: "/placeholder.svg?height=40&width=40",
      mentorSpecialty: "Leadership Skills",
      location: "Virtual Meeting",
      date: "2025-03-10",
      time: "16:15",
      duration: 90,
      amountPaid: 120,
      completed: true,
      rating: 5.0,
    },
    {
      id: 4,
      mentorName: "Dr. James Rodriguez",
      mentorAvatar: "/placeholder.svg?height=40&width=40",
      mentorSpecialty: "Project Management",
      location: "Conference Room A",
      date: "2025-03-05",
      time: "09:00",
      duration: 60,
      amountPaid: 85,
      completed: true,
      rating: 4.8,
    },
  ];
  
  // BookingCard.tsx
  import { motion, AnimatePresence } from "framer-motion";
  import {
    Calendar,
    Clock,
    DollarSign,
    Star,
    MapPin,
    Video,
    MessageSquare,
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
//   import { Booking } from "./BookingsList";
  
  interface BookingCardProps {
    booking: Booking;
    joinInputState?: string;
    onJoinClick: () => void;
    onJoinSession: () => void;
    onJoinInputChange: (value: string) => void;
  }
  
  export const BookingCard = ({
    booking,
    joinInputState,
    onJoinClick,
    onJoinSession,
    onJoinInputChange,
  }: BookingCardProps) => {
    // Calculate time left for upcoming bookings
    const calculateTimeLeft = (date: string, time: string) => {
      const bookingDate = new Date(`${date}T${time}:00`);
      const now = new Date();
  
      if (bookingDate < now) return null;
  
      const diffMs = bookingDate.getTime() - now.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor(
        (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
      if (diffDays > 0) {
        return `${diffDays}d ${diffHours}h remaining`;
      } else if (diffHours > 0) {
        return `${diffHours}h ${diffMinutes}m remaining`;
      } else {
        return `${diffMinutes}m remaining`;
      }
    };
  
    // Calculate percentage of time remaining
    const calculateTimePercentage = (date: string, time: string) => {
      const bookingDate = new Date(`${date}T${time}:00`);
      const now = new Date();
  
      if (bookingDate < now) return 100;
  
      const diffMs = bookingDate.getTime() - now.getTime();
      const totalDuration = 7 * 24 * 60 * 60 * 1000; // Assuming 7 days is the max booking window
      const elapsed = totalDuration - diffMs;
  
      return Math.min(
        100,
        Math.max(0, Math.floor((elapsed / totalDuration) * 100))
      );
    };
  
    // Format date in more readable format
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
  
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group bg-gradient-to-br to-gray-700 border-l-4 border-l-primary/70">
        <CardHeader className="py-3 px-4">
          <div className="flex justify-between items-start gap-2">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-12 w-12 border-2 border-primary/10 shadow-sm">
                  <AvatarImage
                    src={booking.mentorAvatar}
                    alt={booking.mentorName}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5 text-primary font-medium">
                    {booking.mentorName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                    <div className={`w-4 h-4 rounded-full ${
                    booking.completed
                      ? "bg-green-500"
                      : "bg-blue-500"
                  }`}
                ></div>
              </div>
            </div>
            <div>
              <CardTitle className="text-base flex items-center gap-1 font-semibold">
                {booking.mentorName}
                <div className="flex items-center text-amber-500 text-xs ml-1">
                  <Star className="h-3 w-3 fill-amber-500 stroke-amber-500" />
                  <span className="ml-0.5">
                    {booking.rating}
                  </span>
                </div>
              </CardTitle>
              <CardDescription className="text-xs font-medium text-primary/80">
                {booking.mentorSpecialty}
              </CardDescription>
            </div>
          </div>
          <Badge
            variant={
              booking.completed ? "secondary" : "default"
            }
            className={`${
              booking.completed
                ? "bg-green-100 text-green-800 hover:bg-green-200"
                : "bg-blue-100 text-blue-800 hover:bg-blue-200"
            } text-xs py-0.5 px-2 rounded-full transition-all`}
          >
            {booking.completed ? "Completed" : "Upcoming"}
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
              <span className="text-sm">
                {new Date(
                  `${booking.date}T${booking.time}`
                ).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <span className="text-xs text-gray-500">
              {booking.duration} min
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-gray-500" />
              <span className="text-gray-600 text-xs">
                {booking.location}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-3.5 w-3.5 text-green-500" />
              <span className="font-medium text-gray-700">
                ${booking.amountPaid}
              </span>
            </div>
          </div>

          {!booking.completed && (
            <div className="pt-1">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-blue-600 font-medium">
                  {calculateTimeLeft(
                    booking.date,
                    booking.time
                  )}
                </span>
                <span className="text-gray-500">
                  {calculateTimePercentage(
                    booking.date,
                    booking.time
                  )}
                  %
                </span>
              </div>
              <Progress
                value={calculateTimePercentage(
                  booking.date,
                  booking.time
                )}
                className="h-1.5 bg-primary/5"
              />
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="px-4 py-2 bg-gray-50 border-t">
        <div className="w-full flex flex-col gap-2">
          {booking.completed ? (
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <MessageSquare className="h-3.5 w-3.5 text-gray-500 mr-1" />
                <span className="text-xs text-gray-500">
                  Review session
                </span>
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
                  onClick={onJoinClick}
                >
                  <Video className="h-3 w-3" />
                  {joinInputState !== undefined
                    ? "Cancel"
                    : "Join"}
                </Button>
              </div>

              {/* Join input appears inline when join button is clicked */}
              <AnimatePresence>
                {joinInputState !== undefined && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-2 border-t border-gray-200 mt-2"
                  >
                    <div className="flex gap-2 items-center">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                          <Video className="h-3 w-3 text-gray-500" />
                        </div>
                        <input
                          type="text"
                          value={joinInputState}
                          onChange={(e) => onJoinInputChange(e.target.value)}
                          className="w-full pl-7 pr-2 py-1 text-xs border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary/30 rounded-full transition-all text-gray-800 outline-none"
                          placeholder="Enter session code"
                          autoFocus
                        />
                      </div>
                      <Button
                        size="sm"
                        className="h-6 rounded-full bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 text-xs px-3"
                        onClick={onJoinSession}
                        disabled={!joinInputState?.trim()}
                      >
                        Join Now
                      </Button>
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