"use client"
import { addDays, isSameDay } from "date-fns"

export const timeSlots = [
  "9:00 AM",
  "11:00 AM",
  "1:00 PM",
  "3:00 PM",
  "5:00 PM",
  "7:00 PM",
];


type TimeSlotProps = {
  selectedDate: Date | undefined
  selectedSlot: string | null
  onSelectTimeSlot: (slot: string) => void
}

export default function TimeSlots({ selectedDate, selectedSlot, onSelectTimeSlot }: TimeSlotProps) {


  return (
    <div className="space-y-2">
      {!selectedDate ? (
        <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 rounded-lg text-center shadow-sm">
          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
            Please select a date to see available time slots
          </p>
        </div>
      ) : timeSlots.length === 0 ? (
        <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 rounded-lg text-center shadow-sm">
          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">No available time slots for this date</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 mt-2">
          {timeSlots.map((slot, index) => (
            <div
              key={index}
              className={`
                text-center py-3 px-4 rounded-md text-sm font-medium transition-all duration-300 bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 cursor-pointer hover:shadow-md hover:scale-105"
                ${
                  slot
                  // slot.available
                  //   ? selectedSlot === slot.time
                      // ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md transform scale-105"
                      // : "bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 cursor-pointer hover:shadow-md hover:scale-105"
                    // : "bg-red-50 dark:bg-red-900/20 text-red-400 cursor-not-allowed opacity-60 border border-red-200 dark:border-red-800/40"
                }
              `}
              // onClick={() => {
              //   if (slot.available) {
              //     onSelectTimeSlot(slot.time)
              //   }
              // }}
            >
              <div className="flex items-center justify-center">
                {slot}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

