import dynamic from "next/dynamic";
import Loader from "../loading";

// Lazy load components
const Mentee = dynamic(() => import("./pages/Mentee"), { ssr: false, loading: () =><div><Loader/></div> });
const MentorShipHeader = dynamic(() => import("./pages/MentorShipHeader"), { ssr: false, loading: () => <div><Loader/></div> });

const MentorshipPage = () => {
  return (
    <div className="min-h-screen shadow-2xl mt-14 transition-all duration-500 bg-gradient-to-br from-[#eef5ff] via-[#dbeafe] to-[#bfdbfe]">
      {/* Header Section */}
      <MentorShipHeader />
      <Mentee />
    </div>
  );
};

export default MentorshipPage;

