import React, { useState } from "react";
import { Clock, MapPin, Phone } from "lucide-react";
import { BookingI } from "@/app/Mentorship/pages/MentorShipHeader";
import { IUser } from "@/models/user.model";
import { TabType } from "@/app/Mentorship/pages/Booking";
import BookingActionPopup from "./BookingAction";
import { useRouter } from "next/navigation";
import { firestore } from "@/lib/firebase";
import { collection, doc } from "firebase/firestore";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

interface EventCardProps {
  booking: BookingI;
  // user: IUser;
  index: number;
  activeTab: TabType;
}

const EventCard = ({ booking,index, activeTab }: EventCardProps) => {

  const router=useRouter()
  const [showPopup, setShowPopup] = useState(false);
  const [isCalling,setIscalling]=useState(false)
  const {user}=useUser()
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

  const handleStartCall = async() => {
    setIscalling(true)
    const callCollection=collection(firestore,"calls")
    const callDoc=doc(callCollection)
    const callId=callDoc.id
    console.log(callId);
    
    await axios.patch(`api/booking/${booking.bookingId}`,{
      callId
    })
    router.push(`/Mentorship/call/${callId}`)
    setIscalling(false)
    setShowPopup(false);
  };

  const handleCancelBooking = () => {
    // Add your cancel booking logic here
    console.log("Cancelling booking:", booking);
    setShowPopup(false);
  };

  const avatars = [booking?.profilePhoto, user?.imageUrl];
  return (
    <>
      <div 
        className="flex flex-row border rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-150 bg-white group cursor-pointer"
        onClick={() => setShowPopup(true)}
      >
        {/* Date Column */}
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

        {/* Event Details */}
        <div className="flex-1 p-4">
          <div className="flex flex-row items-center mb-2 gap-10">
            <div className="flex flex-col gap-4 order-1">
              <div className="flex items-center rounded-md px-2 py-1">
                <Clock className="w-4 h-4 text-gray-500 mr-1 flex-shrink-0" />
                <span className="text-sm text-gray-700 font-medium truncate">
                  {booking.time}
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
                {`30min call meeting ${booking.firstName} <> ${user?.firstName}`}
                <span className="text-xs text-gray-500 ml-2">(30 min call)</span>
              </div>

              <div className="flex">
                {avatars.map((avatar, avatarIndex) => (
                  <div
                    key={avatarIndex}
                    className={`w-8 h-8 rounded-full  text-white font-bold flex items-center justify-center border-2 border-white -mr-1 overflow-hidden`}
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
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="w-16 sm:w-32 border-l justify-center p-2 sm:p-4 flex-col items-center flex">
          <button
            className={`px-3 py-2 ${
              index == 0 && activeTab == "Bookings"
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-300"
            } text-white rounded-md flex items-center justify-center gap-1 transition-colors duration-150 text-xs font-medium whitespace-nowrap`}
            onClick={(e) => {
              e.stopPropagation();
              setShowPopup(true);
            }}
          >
            <Phone className="h-3 w-3" />
            <span className="hidden sm:inline">Start Call</span>
          </button>
        </div>
      </div>

      {/* Popup Component */}
      <BookingActionPopup
        booking={booking}
        activeTab={activeTab}
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        onStartCall={handleStartCall}
        onCancelBooking={handleCancelBooking}
        isCalling={isCalling}
      />
    </>
  );
};

export default EventCard;