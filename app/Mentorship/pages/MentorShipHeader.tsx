"use client";
import { useState, useRef, useEffect, use } from "react";
import { AnimatePresence } from "framer-motion";
import { Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingsList } from "./BookingsList";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { bookings } from "./BookingCard";
import { getCurrentUser } from "@/lib/serveractions";
import axios from "axios";

const MentorshipHeader = () => {
  const user=useAppSelector((state)=>state.counter.user)
  const isMentorView = useAppSelector((state) => state.counter.isMentor);
  const [showBookings, setShowBookings] = useState(false);
  const bookingsRef = useRef<HTMLDivElement>(null);

  // Close bookings panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        bookingsRef.current &&
        !bookingsRef.current.contains(event.target as Node)
      ) {
        setShowBookings(false);
      }
    };

    if (showBookings) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showBookings]);

  return (
    <div className="relative">
      <header className="shadow-sm rounded-t-[10px]">
        <div className="py-6">
          {/* Flex container to keep items in the same row */}
          <div className="flex flex-row flex-nowrap justify-between items-start sm:items-center w-full gap-4">
            {/* Left Section (Heading + Quote) */}
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Hi, Alex
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                "Growth begins at the end of your comfort zone"
              </p>
            </div>

            <Button
              onClick={async () => {
                setShowBookings(!showBookings);
                const user=await getCurrentUser()                              
                const res = await axios.get(`/api/booking?userId=${user._id}`);
              }}
              className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary relative z-20"
            >
              <Calendar className="w-4 h-4" />
              {showBookings ? "Hide" : "Show"} Bookings
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  showBookings ? "rotate-180" : ""
                }`}
              />
            </Button>
          </div>
        </div>
      </header>

      {/* Bookings overlay panel */}
      <AnimatePresence>
        {showBookings && (
          <BookingsList
            bookingsRef={bookingsRef}
            bookings={bookings}
            onClose={() => setShowBookings(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MentorshipHeader;
