"use client";

import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { TabType } from "@/app/Mentorship/pages/Booking";
import { motion } from "framer-motion";
import Header from "@/app/Mentorship/pages/Header";
import TabSelector from "@/app/Mentor/pages/TabSelector";
import EventCard from "@/app/Mentor/pages/EventCard";
import MentorshipSettings from "@/app/Mentorship/pages/MentorShipSetting";
import Sidebar from "@/app/Mentor/pages/SideBar";
import axios from "axios";
import { BookingI } from "@/app/Mentorship/pages/MentorShipHeader";
import { getCurrentUser } from "@/lib/serveractions";

const BookingsPage = () => {
  const [user, setUser] = useState();
  const [bookings, setBookings] = useState<BookingI[]>();
  const [filteredBookings, setFilteredBookings] = useState<BookingI[]>();
  const [activeTab, setActiveTab] = useState<TabType>("Bookings");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingRef = useRef<HTMLDivElement | null>(null); // Correct typing
  const tabs: TabType[] = ["Bookings", "Upcoming", "Past"];

  useEffect(() => {
    (async () => {
      const res = await axios.get(`/api/mentor/booking`);
      const user = await getCurrentUser();
      setUser(user);

      setBookings(res.data.data);
      setFilteredBookings(res.data.data);
    })();
  }, []);

  const filterBookings = (type: "Bookings" | "Upcoming" | "Past"): void => {
    if (type == "Bookings") {
      setFilteredBookings(bookings);
      return;
    }
    const date = new Date();
    const filteredbookings = bookings?.filter((booking) =>
      type == "Upcoming"
        ? new Date(booking.date) > date
        : new Date(booking.date) < date
    );

    setFilteredBookings(filteredbookings);
  };

  useEffect(() => {
    if (settingsOpen && settingRef.current) {
      settingRef.current.scrollTop = 0;
    }
  }, [settingsOpen]);

  useGSAP(() => {
    if (settingsOpen) {
      gsap.to(settingRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(settingRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [settingsOpen]);
  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full z-30 transform transition-transform duration-300 ease-in-out sm:sticky sm:top-0 sm:h-screen sm:translate-x-0 sm:w-16 md:w-72 flex-shrink-0 bg-white/80 backdrop-blur-lg shadow-md dark:bg-gray-800 dark:border-gray-700 rounded-r-2xl ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:block`}
      >
        <Sidebar setActiveTab={setActiveTab} filterBookings={filterBookings} />
      </div>

      <div className="flex-1 flex flex-col w-full">
        <Header
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          setSettingsOpen={setSettingsOpen}
        />

        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-center mb-6 flex-wrap gap-2"
          >
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                Bookings
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                See your scheduled events from your calendar events links.
              </p>
            </div>
          </motion.div>

          {/* Tabs */}
          <TabSelector
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            bookings={filteredBookings!}
            filterBookings={filterBookings}
          />

          {/* Events */}
          <div className="space-y-6">
            {filteredBookings?.map((booking, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <EventCard
                  booking={booking}
                  user={user!}
                  index={index}
                  activeTab={activeTab}
                />
              </motion.div>
            ))}
          </div>
        </div>
        <div
          className="fixed top-4 z-10 w-full h-full bg-white pt-12 px-3 
           translate-y-full overflow-y-auto pb-20"
          ref={settingRef}
        >
          <MentorshipSettings setMentorSettingOpen={setSettingsOpen} />
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
