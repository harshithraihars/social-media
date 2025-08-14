import dynamic from "next/dynamic";
import Loader from "../Mentor/loading";
import { fetchMenteeBookings } from "@/lib/serverAction/bookingAction";
import Mentee from "./pages/Mentee";
import MentorshipHeader from "./pages/MentorShipHeader";

const MentorshipPage = async() => {

  const menteeBookings=await fetchMenteeBookings()
  return (
    <div className="min-h-screen shadow-2xl mt-14 transition-all duration-500 bg-gradient-to-br from-[#eef5ff] via-[#dbeafe] to-[#bfdbfe]">
      {/* Wrapper to maintain content width */}
      <div className="mx-0 md:mx-10 px-4 sm:px-6 lg:px-8 flex-grow">
        {/* Header Section */}
        <MentorshipHeader menteeBookings={menteeBookings}/>
        <Mentee />
      </div>
    </div>
  );
};

export default MentorshipPage;
