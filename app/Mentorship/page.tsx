import { fetchMenteeBookings } from "@/lib/serverAction/bookingAction";
import Mentee from "./components/pages/Mentee";
import MentorshipHeader from "./components/navigation/MentorShipHeader";
import { currentUser } from "@clerk/nextjs/server";
import { getprofile } from "@/lib/serverAction/profileAction";

const MentorshipPage = async () => {
  const user = await currentUser();
  const menteeBookings = await fetchMenteeBookings(user?.id);

  let userProfile = null;

  if (user) {
    const data = await getprofile(user?.id);
    userProfile = JSON.parse(
      JSON.stringify({
        ...data?.profile,
        transactions: data?.transactions,
      })
    );
  }

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
