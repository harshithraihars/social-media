import React from "react";
import { Calendar, Clock, MapPin, Video } from "lucide-react";
import { BookingI } from "@/app/Mentorship/pages/MentorShipHeader";
import { IUser } from "@/models/user.model";

interface EventCardProps {
  booking: BookingI;
  user: IUser;
  index: Number;
}

const EventCard = ({ booking, user, index }: EventCardProps) => {

  function getDateAndDay(dateStr: string): { day: string; date: number } {
    const dateObj = new Date(dateStr);
    if (isNaN(dateObj.getTime())) {
      throw new Error("Invalid date string");
    }

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = days[dateObj.getDay()];
    const date = dateObj.getDate(); // gets the day of the month (e.g., 22)

    return { day, date };
  }
  const avatars = [booking?.profilePhoto, user?.profilePhoto];
  return (
    <div className="flex flex-row border rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-150 bg-white group">
      {/* Date Column - Just added more width */}
      <div className="w-28 sm:w-24 bg-gray-50 flex flex-col items-center justify-center py-4 border-r group-hover:bg-orange-50 transition-colors duration-150">
        <div
          className={`text-sm font-medium ${
            index == 0 ? "text-orange-500" : "text-black"
          }`}
        >
          {getDateAndDay(booking.date).day}
        </div>
        <div
          className={`text-3xl font-bold ${
            index == 0 ? "text-orange-500" : "text-black"
          }`}
        >
          {getDateAndDay(booking.date).date}
        </div>
      </div>

      {/* Event Details - Unchanged */}
      <div className="flex-1 p-4">
        <div className="flex flex-row items-center mb-2 gap-10">
          <div className="flex flex-col gap-4 order-1">
            <div className="flex items-center rounded-md px-2 py-1">
              <Clock className="w-4 h-4 text-gray-500 mr-1 flex-shrink-0" />
              <span className="text-sm text-gray-700 font-medium truncate">
                {booking.time}
                {/* {hasNotification && (
                  <span className="inline-flex items-center justify-center w-4 h-4 ml-1 bg-orange-500 rounded-full text-white text-xs font-bold">
                    1
                  </span>
                )} */}
              </span>
            </div>
            <div className="flex items-center rounded-md px-2 py-1">
              <MapPin className="w-5 h-5 text-gray-500 mr-1 flex-shrink-0" />
              <span className="text-sm text-gray-700 font-medium truncate max-w-xs">
                Online
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1 order-2 mb-0">
            <div className="hidden sm:block text-gray-800 font-medium text-base mb-2">
              {/* {title} */}
              {`30min call meeting ${booking.firstName} <> ${user.firstName}`}
              <span className="text-xs text-gray-500 ml-2">(30 min call)</span>
            </div>

            <div className="flex">
              {avatars.map((avatar, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 rounded-full  text-white font-bold flex items-center justify-center border-2 border-white -mr-1 overflow-hidden`}
                  style={{ zIndex: 10 - index }}
                >
                  <img
                    src={avatar}
                    alt="User avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Actions - Added more width */}
      <div className="w-16 sm:w-12 border-l justify-center p-0 flex-col items-center flex">
        <button className="w-8 h-8 sm:w-7 sm:h-7 rounded-full bg-gray-100 hover:bg-blue-100 hover:text-blue-600 flex items-center justify-center mb-2 transition-colors duration-150">
          <Video className="h-3 w-3" />
        </button>
        <button className="w-8 h-8 sm:w-7 sm:h-7 rounded-full bg-gray-100 hover:bg-blue-100 hover:text-blue-600 flex items-center justify-center transition-colors duration-150">
          <Calendar className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};

export default EventCard;
