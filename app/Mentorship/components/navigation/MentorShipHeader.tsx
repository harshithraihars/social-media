"use client"
import { useState, useRef, useEffect, use } from "react";
import { AnimatePresence } from "framer-motion";
import { Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/hooks";
import { useUser } from "@clerk/nextjs";
import { BookingsList } from "../booking/BookingsList";
export interface BookingI {
    id:string,
    bookingId:string
    firstName:string
    lastName:string
    profilePhoto:string
    date: string;
    time: string;
    Duration:string
    sessionAmount:number
    Role:string
    CompanyName:string
    Rating:number
  }
const MentorshipHeader = ({menteeBookings}:{menteeBookings:BookingI[]}) => {


  const dispatch=useAppDispatch();

  const {user}=useUser()
  const [bookings, setBookings] = useState<BookingI[]>(menteeBookings || []);
  const [showBookings, setShowBookings] = useState(false);
  const bookingsRef = useRef<HTMLDivElement>(null);

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
                Hi, {user?.firstName}
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                "Growth begins at the end of your comfort zone"
              </p>
            </div>

            <Button
              onClick={async () => {
                setShowBookings(!showBookings);
                
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
            bookings={bookings!}
            onClose={() => setShowBookings(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MentorshipHeader;
