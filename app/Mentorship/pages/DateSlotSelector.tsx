import { Calendar } from "@/components/ui/calendar";
import React from "react";
import { timeSlots } from "./TimeSlot";

const DateSlotSelector = ({
  selectedDate,
  setSelectedDate,
  toggleDateSlot,
  availabilityByDate,
}: {
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  toggleDateSlot: (slot: string) => void;
  availabilityByDate: Record<string, string[]>;
}) => {
  const isDateSlotSelected = (time: string) => {
    if (!selectedDate) return false;
    const dateKey = selectedDate.toISOString().split("T")[0];
    return availabilityByDate[dateKey]?.includes(time) || false;
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

  return (
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
              {timeSlots.map((slot, index) => {
                if (isPastTimeSlot(slot)) return null;
                return (
                  <div
                    key={index}
                    className={`
                                text-center py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300  dark:bg-gray-800 border border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 cursor-pointer hover:shadow-md hover:scale-105
                                ${
                                  isDateSlotSelected(slot)
                                    ? "bg-gray-900 text-white border-4 border-white"
                                    : "bg-white"
                                }
                              `}
                    onClick={() => {
                      toggleDateSlot(slot);
                    }}
                  >
                    <div className="flex items-center justify-center">
                      {slot}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateSlotSelector;
