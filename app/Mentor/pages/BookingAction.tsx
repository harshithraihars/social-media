"use client"
import React from "react";
import { X, Video, PhoneOff } from "lucide-react";
import { BookingI } from "@/app/Mentorship/pages/MentorShipHeader";
import { TabType } from "@/app/Mentorship/pages/Booking";
import { useUser } from "@clerk/nextjs";

interface BookingActionPopupProps {
  booking: BookingI;
  activeTab: TabType;
  isOpen: boolean;
  onClose: () => void;
  onStartCall: () => void;
  onCancelBooking: () => void;
  isCalling:boolean
}

const BookingActionPopup = ({
  booking,
  activeTab,
  isOpen,
  onClose,
  onStartCall,
  onCancelBooking,
  isCalling
}: BookingActionPopupProps) => {
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
    const date = dateObj.getDate();

    return { day, date };
  }

  const {user}=useUser()
  const avatars = [booking?.profilePhoto, user?.imageUrl];
  const isUpcoming = activeTab === "Upcoming" || (activeTab === "Bookings" && new Date(booking.date) > new Date());

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-200 scale-100"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-end p-4 pb-0">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="px-6 pb-6">
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="flex">
                  {avatars.map((avatar, avatarIndex) => (
                    <div
                      key={avatarIndex}
                      className="w-8 h-8 rounded-full border-2 border-white -mr-1 overflow-hidden"
                      style={{ zIndex: 10 - avatarIndex }}
                    >
                      <img
                        src={avatar}
                        alt="User avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    {`${booking.firstName} <> ${user?.firstName}`}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {getDateAndDay(booking.date).day}, {getDateAndDay(booking.date).date} • {booking.time}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">30 minute call • Online</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={onStartCall}
                disabled={!isUpcoming}
                className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-medium transition-all duration-200 ${
                  isUpcoming
                    ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Video className="w-5 h-5" />
                <span>{isUpcoming ? `${isCalling?"Calling..":"Start Call Now"}` : 'Call Not Available'}</span>
              </button>

              <button
                onClick={onCancelBooking}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-medium bg-red-500 hover:bg-red-600 text-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                <PhoneOff className="w-5 h-5" />
                <span>Cancel Booking</span>
              </button>
            </div>

            {!isUpcoming && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  This meeting has already passed. You can only start calls for upcoming meetings.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingActionPopup;