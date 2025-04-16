import dynamic from "next/dynamic";
import Loader from "../loading";
import a from "./pages/MentorShipActivationCard"
import ProfileEdit from "./pages/EditProfile";
// Lazy load components
const MentorShipActivationCard = dynamic(() => import("./pages/MentorShipActivationCard"), { ssr: false, loading: () =><div><Loader/></div> });

const MentorshipPage = () => {
  return (
    <div className="min-h-screen shadow-2xl mt-14 transition-all duration-500 bg-gradient-to-br from-[#eef5ff] via-[#dbeafe] to-[#bfdbfe]">
        <MentorShipActivationCard/>
    </div>
  );
};

export default MentorshipPage;
