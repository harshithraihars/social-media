"use client";

import React, { useEffect, useRef, useState } from "react";
import { TabType } from "./Booking";
import Sidebar from "./SideBar";
import Header from "./Header";
import TabSelector from "./TabSelector";
import EventCard from "./EventCard";
import { motion } from "framer-motion";
import MentorshipSettings from "./MentorShipSetting";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const BookingsPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>("Upcoming");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingRef = useRef<HTMLDivElement | null>(null); // Correct typing
  const tabs: TabType[] = [
    "Upcoming",
    "Pending",
    "Recurring",
    "Past",
    "Cancelled",
  ];

  // This useEffect will now run whenever settingsOpen changes to true
  useEffect(() => {
    if (settingsOpen && settingRef.current) {
      settingRef.current.scrollTop = 0; // Scroll to top when settings are opened
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

      {/* Sidebar Wrapper */}
      <div
        className={`fixed top-0 left-0 h-full z-30 transform transition-transform duration-300 ease-in-out sm:relative sm:translate-x-0 sm:w-16 md:w-72 flex-shrink-0 bg-white/80 backdrop-blur-lg shadow-md dark:bg-gray-800 dark:border-gray-700 rounded-r-2xl ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:block`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Header */}
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
          />

          {/* Events */}
          <div className="space-y-6">
            {[
              {
                day: "Wed",
                date: "28",
                time: "09:00 - 09:30",
                title: "30min call meeting Peer <> Leslie",
                location: "Online",
                avatars: ["./img2.jpg", "./img3.jpg"],
                colors: ["bg-pink-500", "bg-purple-500"],
                isFirst: true,
              },
              {
                day: "Thu",
                date: "29",
                time: "11:15 - 11:45",
                title: "30min call meeting Olivia, Liam <> Alban",
                location: "Online",
                avatars: ["./img2.jpg", "./img3.jpg"],
                colors: ["bg-yellow-500", "bg-green-500", "bg-blue-500"],
                hasNotification: true,
              },
              {
                day: "Fri",
                date: "30",
                time: "15:20 - 16:20",
                title: "Livn Product Demo",
                location: "Wework Paris",
                avatars: ["./img2.jpg", "./img3.jpg"],

                colors: [
                  "bg-red-500",
                  "bg-orange-500",
                  "bg-yellow-500",
                  "bg-green-500",
                ],
              },
            ].map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <EventCard {...event} />
              </motion.div>
            ))}

            {/* Section Divider */}
            <div className="flex items-center gap-2 mt-8 mb-4">
              <div className="text-lg font-medium text-gray-800 dark:text-white">
                May
              </div>
              <div className="h-0.5 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 dark:from-gray-600 dark:to-gray-500 flex-1"></div>
            </div>

            {/* Next Month Event */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <EventCard
                day="Mon"
                date="01"
                time="09:00 - 09:30"
                title="30min call meeting Alicia, Peer <> Naomi"
                location="Hubsy Républi..."
                avatars={[
                  "/api/placeholder/40/40",
                  "/api/placeholder/40/40",
                  "/api/placeholder/40/40",
                ]}
                colors={["bg-indigo-500", "bg-purple-500", "bg-pink-500"]}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <EventCard
                day="Mon"
                date="01"
                time="09:00 - 09:30"
                title="30min call meeting Alicia, Peer <> Naomi"
                location="Hubsy Républi..."
                avatars={["/api/placeholder/40/40", "/api/placeholder/40/40"]}
                colors={["bg-indigo-500", "bg-purple-500", "bg-pink-500"]}
              />
            </motion.div>
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
