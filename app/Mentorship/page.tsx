import MentorShipHeader from "./pages/MentorShipHeader";
import MentorSwitch from "./pages/MentorSwitch";

const MentorshipPage = () => {
  return (
    <div
      className={`min-h-screen shadow-2xl mt-20 transition-all duration-500 bg-gradient-to-br from-[#eef5ff] via-[#dbeafe] to-[#bfdbfe]`}
    >
      {/* Header Section */}
      <MentorShipHeader/>
      <MentorSwitch/>
    </div>
  );
};

export default MentorshipPage;
