import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TimeSlots from "./TimeSlot";

interface DateTimeSelectorProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  timezone: string;
  setTimezone: (timezone: string) => void;
  timeSlot: string | null;
  setTimeSlot: (timeSlot: string | null) => void;
}

export default function DateTimeSelector({
  date,
  setDate,
  timezone,
  setTimezone,
  timeSlot,
  setTimeSlot,
}: DateTimeSelectorProps) {
  return (
    <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-lg p-4 shadow-sm w-full">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-300">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border-0 bg-transparent w-full"
            disabled={(date) => {
              // Disable past dates and weekends
              return (
                date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                date.getDay() === 0 ||
                date.getDay() === 6
              );
            }}
          />
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-white dark:from-blue-900/20 dark:to-blue-800/10 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
            <p className="text-sm font-medium flex items-center text-blue-700 dark:text-blue-400">
              <CalendarIcon className="mr-2 h-4 w-4 text-blue-500" />
              {date ? format(date, "MMMM d, yyyy") : "Select a date"}
            </p>
            <div className="flex items-center">
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger className="w-[140px] border-blue-200 dark:border-blue-800 focus:ring-blue-300 bg-white dark:bg-gray-800 hover:border-blue-300 transition-all duration-300">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="EST">EST (UTC-5)</SelectItem>
                  <SelectItem value="PST">PST (UTC-8)</SelectItem>
                  <SelectItem value="IST">IST (UTC+5:30)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TimeSlots
            selectedDate={date}
            selectedSlot={timeSlot}
            onSelectTimeSlot={setTimeSlot}
          />
        </div>
      </div>
    </div>
  );
}