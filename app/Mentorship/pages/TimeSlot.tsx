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
        <p className="text-sm text-muted-foreground">Please select a date to see available time slots</p>
      ) : timeSlots.length === 0 ? (
        <p className="text-sm text-muted-foreground">No available time slots for this date</p>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {timeSlots.map((slot, index) => (
            <div
              key={index}
              className={`
                text-center py-2 px-3 rounded-md text-sm transition-colors
                ${
                  slot.available
                    ? selectedSlot === slot.time
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80 cursor-pointer"
                    : "bg-red-100 text-red-400 cursor-not-allowed opacity-60"
                }
              `}
              onClick={() => {
                if (slot.available) {
                  onSelectTimeSlot(slot.time)
                }
              }}
            >
              {slot.time}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
