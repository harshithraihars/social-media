import Mentee from "./pages/Mentee";
import MentorShipHeader from "./pages/MentorShipHeader";
import { AnimatePresence,motion } from 'framer-motion'

const MentorshipPage = () => {
  return (
    <div
      className={`min-h-screen shadow-2xl mt-14 transition-all duration-500 bg-gradient-to-br from-[#eef5ff] via-[#dbeafe] to-[#bfdbfe]`}
    >
      {/* Header Section */}
      <MentorShipHeader/>
      {/* <MentorSwitch/> */}
      {/* <motion.div
            key="mentee"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            layout
          > */}
            <Mentee />
          {/* </motion.div> */}
    </div>
  );
};

export default MentorshipPage;
