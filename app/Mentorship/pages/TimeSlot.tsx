"use client"
import { addDays, isSameDay } from "date-fns"

type TimeSlot = {
  time: string
  available: boolean
}

type TimeSlotProps = {
  selectedDate: Date | undefined
  selectedSlot: string | null
  onSelectTimeSlot: (slot: string) => void
}

export default function TimeSlots({ selectedDate, selectedSlot, onSelectTimeSlot }: TimeSlotProps) {
  // Generate time slots based on the selected date
  const getTimeSlots = (date: Date | undefined): TimeSlot[] => {
    if (!date) return []

    // Generate different availability patterns based on the day
    const dayOfWeek = date?.getDay()
    const isToday = date && isSameDay(date, new Date())
    const isTomorrow = date && isSameDay(date, addDays(new Date(), 1))

    const slots: TimeSlot[] = []

    // Start times from 9 AM to 5 PM
    for (let hour = 9; hour <= 17; hour++) {
      // Skip past times if it's today
      if (isToday && hour < new Date().getHours()) continue

      const time = `${hour % 12 || 12}:00 ${hour >= 12 ? "PM" : "AM"}`

      // Create some random unavailability patterns
      let available = true

      // Make some slots unavailable based on different patterns
      if (
        (dayOfWeek === 1 && (hour === 10 || hour === 14)) || // Monday
        (dayOfWeek === 2 && (hour === 11 || hour === 15)) || // Tuesday
        (dayOfWeek === 3 && (hour === 9 || hour === 13)) || // Wednesday
        (dayOfWeek === 4 && (hour === 12 || hour === 16)) || // Thursday
        (dayOfWeek === 5 && (hour === 10 || hour === 15)) // Friday
      ) {
        available = false
      }

      slots.push({ time, available })
    }

    return slots
  }

  const timeSlots = getTimeSlots(selectedDate)

  return (
    <div className="space-y-2">
      {!selectedDate ? (
        <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 rounded-lg text-center shadow-sm">
          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Please select a date to see available time slots</p>
        </div>
      ) : timeSlots.length === 0 ? (
        <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 rounded-lg text-center shadow-sm">
          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">No available time slots for this date</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {timeSlots.map((slot, index) => (
            <div
              key={index}
              className={`
                text-center py-3 px-4 rounded-md text-sm font-medium transition-all duration-300
                ${
                  slot.available
                    ? selectedSlot === slot.time
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md transform scale-105"
                      : "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-800/40 dark:hover:to-blue-700/40 cursor-pointer hover:shadow-md hover:scale-105"
                    : "bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 text-red-400 cursor-not-allowed opacity-60"
                }
              `}
              onClick={() => {
                if (slot.available) {
                  onSelectTimeSlot(slot.time)
                }
              }}
            >
              <div className="flex items-center justify-center">
                {slot.available ? (
                  <svg className={`h-4 w-4 mr-2 ${selectedSlot === slot.time ? 'text-white' : 'text-blue-500'}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg className="h-4 w-4 mr-2 text-red-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                    <path d="M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M15 9L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                )}
                {slot.time}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}