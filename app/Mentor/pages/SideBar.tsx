import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import {
  Calendar,
  History,
  CalendarCheck,
  Workflow,
  X,
  User,
  Settings,
} from "lucide-react";
import SidebarItem from "../../Mentorship/pages/SideBarItem";
import gsap from "gsap";
import MentorshipSettings from "./Settings/MentorShipSetting";
import { TabType } from "@/app/Mentorship/pages/Booking";
interface sidebarProps {
  filterBookings:(tab:TabType)=>void
  setActiveTab:React.Dispatch<React.SetStateAction<TabType>>
}
export default function Sidebar({filterBookings,setActiveTab}:sidebarProps) {
  const settingPageRef = useRef<HTMLDivElement | null>(null);
  const [mentorSettingOpen, setMentorSettingOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    if (mentorSettingOpen && settingPageRef.current) {
      settingPageRef.current.scrollTop = 0; // Scroll to top when settings are opened
    }
  }, [mentorSettingOpen]);
  useGSAP(() => {
    if (mentorSettingOpen) {
      if (settingPageRef.current) {
        settingPageRef.current.style.display = "block"; // Show before animating
      }
      gsap.to(settingPageRef.current, {
        y: "0%",
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        onComplete: () => {
          if (settingPageRef.current) {
            settingPageRef.current.scrollTop = 0; // Scroll after animation completes
          }
        },
      });
    } else {
      gsap.to(settingPageRef.current, {
        y: "100%",
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => {
          if (settingPageRef.current) {
            settingPageRef.current.style.display = "none"; // Hide after animation
          }
        },
      });
    }
  }, [mentorSettingOpen]);

  const sidebarItems = [
    {
      icon: (
        <Calendar className="transition-transform duration-200 group-hover:rotate-12" />
      ),
      label: "Bookings",
      active: true,
    },
    {
      icon: (
        <CalendarCheck className="transition-transform duration-200 group-hover:rotate-12" />
      ),
      label: "Upcoming",
    },
    {
      icon: (
        <History className="transition-transform duration-200 group-hover:rotate-12 h-14" />
      ),
      label: "Past",
    },
  ];
  return (
    <div className="flex h-full w-full flex-col bg-white shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl sm:w-16 md:w-72">
      {/* Logo Section */}
      <div className="border-b transition-colors duration-200 bg-white">
        <div className="px-2 py-2 flex items-center justify-between">
          {/* Logo and App Name */}
          <div className="flex items-center gap-2">
            <div className="rounded bg-gray-100 p-1.5 transition-all duration-200 hover:bg-indigo-100 hover:text-indigo-600 cursor-pointer">
              <Workflow className="h-5 w-5 text-gray-400 transition-all duration-200 group-hover:rotate-12 hover:rotate-12 hover:text-indigo-500" />
            </div>
            <span className="hidden md:block text-xl font-medium text-gray-500 transition-all duration-200 hover:text-indigo-600 cursor-pointer">
              Scheduly
            </span>
          </div>

          {/* Mobile Close Button */}
          <button className="sm:hidden text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>

          {/* Profile Section - Simplified */}
          <div className="relative hidden lg:block">
            <div
              className="flex flex-col items-center transition-all duration-200 hover:bg-gray-50 p-2 rounded cursor-pointer"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <div className="flex items-center gap-4 group cursor-pointer">
                {/* Profile Icon with Animated Glow */}
                <div className="relative">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white shadow-lg transition-all duration-300 ease-out transform group-hover:scale-110 group-hover:shadow-xl group-hover:rotate-6">
                    <User className="h-6 w-6 transition-transform duration-300" />
                  </div>

                  {/* Subtle Glow Effect */}
                  <div className="absolute -z-10 inset-0 scale-0 rounded-full bg-indigo-400 opacity-30 transition-all duration-500 group-hover:scale-125 group-hover:opacity-50 blur-lg" />
                </div>

                {/* Name & Role with Hover Effect */}
                <div className="transition-all duration-300 ease-in-out">
                  <span className="font-semibold text-lg text-gray-800 dark:text-white transition-all duration-300 ease-out group-hover:text-indigo-700 group-hover:translate-x-1">
                    Alex
                  </span>
                </div>
              </div>
            </div>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <div
                  className="flex items-center justify-between hover:bg-indigo-50 cursor-pointer"
                  onClick={() => {
                    setProfileOpen(false);
                    setMentorSettingOpen(true);
                  }}
                >
                  <a
                    href="#settings"
                    className="block px-4 py-2 text-sm text-gray-700"
                  >
                    Settings
                  </a>
                  <Settings className="h-4 w-4 text-gray-700 mr-2" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar Content: Navigation + Profile */}

      <div className="flex flex-col flex-1 justify-between">
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {sidebarItems.map(({ icon, label, active}) => (
              <div onClick={()=>{
                setActiveTab(label as TabType)
                filterBookings(label as TabType)
              }}>
                <SidebarItem
                  key={label}
                  icon={icon}
                  label={label}
                  active={active}
                />
              </div>
            ))}
          </nav>
        </div>
      </div>

      <div
        className="fixed bottom-0 z-10 w-full h-full bg-white pt-12 px-3 
             translate-y-full overflow-y-auto"
        ref={settingPageRef}
      >
        <MentorshipSettings setMentorSettingOpen={setMentorSettingOpen} />
      </div>
    </div>
  );
}
