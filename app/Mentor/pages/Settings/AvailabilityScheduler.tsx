import { Calendar } from "@/components/ui/calendar";
import React from "react";
import { timeSlots } from "../../../Mentorship/pages/TimeSlot";
import { useEffect, useState } from "react";
import {
  Calendar as calendarIcon,
  CalendarIcon,
  HelpCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IProfile } from "@/models/profile.model";
import axios from "axios";

const AvailabilityScheduler = ({
  selectedDate,
  setSelectedDate,
  toggleDateSlot,
  availabilityByDate,
  userprofile,
}: {
  selectedDate: Date | null|undefined;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null |undefined>>;
  toggleDateSlot: (slot: string) => void;
  availabilityByDate: Record<string, string[]>;
  userprofile: IProfile | null;
}) => {
  const [bookedSlots, setBookedSlots] = useState<string[]>();
  const [isLoadingBookedSlots, setIsLoadingBookedSlots] = useState<boolean>();
  const isDateSlotSelected = (time: string) => {
    if (!selectedDate) return false;

    // convert the date to local date
    const dateKey = selectedDate.toLocaleDateString("en-CA");
    return availabilityByDate?.[dateKey]?.includes(time) || false;
  };

  const isPastTimeSlot = (time: string) => {
    if (!selectedDate) return false;

    const today = new Date();
    const isToday = selectedDate.toDateString() === today.toDateString();

    if (!isToday) return false; // ✅ only apply if it's today

    const [h, m, period] = time.match(/\d+|AM|PM/g)!;
    const hours = (parseInt(h) % 12) + (period === "PM" ? 12 : 0);

    const slot = new Date(selectedDate);
    slot.setHours(hours, parseInt(m), 0, 0);

    return slot < today;
  };

  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!selectedDate || !userprofile?._id) return;

      const dateKey = selectedDate.toLocaleDateString("en-CA");

      setIsLoadingBookedSlots(true);
      try {
        const res = await axios.get(
          `/api/mentor/${userprofile._id}/bookings?date=${dateKey}`
        );
        
        console.log(res.data.bookedTimes);
        
        setBookedSlots(res.data.bookedTimes);
      } catch (err) {
        console.error("Failed to fetch booked slots", err);
      } finally {
        setIsLoadingBookedSlots(false);
      }
    };

    fetchBookedSlots();
  }, [selectedDate, userprofile?._id]);

  return (
    <div className="space-y-3 bg-muted/20 p-3 rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium flex items-center gap-1.5">
          <CalendarIcon size={15} />
          Availability Schedule
        </h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <HelpCircle className="h-3.5 w-3.5" />
                <span className="sr-only">Schedule Info</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p className="text-xs">
                Click on time slots to toggle your availability
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div>
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg  shadow-sm hover:shadow-md transition-all duration-300 w-fit md:-ml-7 ">
          <Calendar
            mode="single"
            selected={selectedDate ?? undefined}
            onSelect={(date) => setSelectedDate(date || null)}
            className="rounded-md border-0 bg-transparent"
            disabled={(date) => {
              return (
                date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                date.getDay() === 0 ||
                date.getDay() === 6
              );
            }}
          />
        </div>
        <div className="md:w-64 md:-ml-8">
          <div className="space-y-2">
            {!selectedDate ? (
              <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 rounded-lg text-center shadow-sm">
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                  Please select a date to see available time slots
                </p>
              </div>
            ) : timeSlots.length === 0 ? (
              <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 rounded-lg text-center shadow-sm">
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                  No available time slots for this date
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 mt-2">
                {isLoadingBookedSlots ? (
                  <>
                    {Array(6)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="w-full text-center py-3 px-4 rounded-lg text-sm font-medium border transition-all duration-300 bg-muted/50 dark:bg-muted/30 border-blue-200 dark:border-blue-800 animate-pulse"
                        >
                          <span className="invisible">5:00 PM</span>
                        </div>
                      ))}
                  </>
                ) : (
                  timeSlots.map((slot, index) => {
                    if (isPastTimeSlot(slot)) return null;

                    return (
                      <div
                        key={index}
                        className={`
                  w-full text-center py-3 px-4 rounded-lg text-sm font-medium border transition-all duration-300
                  ${
                    bookedSlots?.includes(slot)
                      ? "bg-green-50 text-green-700 border-green-300 dark:bg-green-900/10 dark:text-green-400 dark:border-green-800 pointer-events-none cursor-default"
                      : isDateSlotSelected(slot)
                      ? "bg-gray-900 text-white border-4 border-white shadow-md scale-105"
                      : "bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 cursor-pointer hover:shadow-md hover:scale-105"
                  }
                `}
                        onClick={() => toggleDateSlot(slot)}
                      >
                        <div className="flex items-center justify-center">
                          {slot}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityScheduler;
