import React from "react";
import { TabType } from "../../Mentorship/pages/Booking";
import { cn } from "@/lib/utils";
import { BookingI } from "../../Mentorship/pages/MentorShipHeader";

type TabSelectorProps = {
  tabs: TabType[];
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  bookings: BookingI[];
  filterBookings: (tab:TabType) => void;
};

const TabSelector = ({
  tabs,
  activeTab,
  setActiveTab,
  bookings,
  filterBookings,
}: TabSelectorProps) => {
  return (
    <div className="mb-6 overflow-hidden rounded-lg border bg-white shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="flex min-w-max overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          const hasNotification = tab === "Bookings";

          return (
            <button
              key={tab}
              className={cn(
                // Base styles
                "group relative px-3 py-2 text-xs font-medium transition-all duration-200 sm:px-6 sm:py-4 sm:text-base",
                // Hover effects
                "hover:bg-gray-50",
                // Focus styles
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 focus:ring-offset-1",
                // Active vs inactive text color
                isActive ? "text-blue-600" : "text-gray-500 hover:text-gray-800"
              )}
              onClick={() => {
                setActiveTab(tab);
                filterBookings(tab);
              }}
            >
              {/* Animated underline indicator */}
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-0.5 w-full transform bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300",
                  isActive
                    ? "scale-100 opacity-100"
                    : "scale-0 opacity-0 group-hover:scale-75 group-hover:opacity-50"
                )}
              />

              {/* Tab content with hover lift effect */}
              <span className="relative flex items-center whitespace-nowrap transition-transform duration-200 group-hover:translate-y-[-1px] group-active:translate-y-[1px]">
                {tab}

                {/* Notification badge with pulse effect */}
                {activeTab==tab && (
                  <span className="ml-1 sm:ml-2 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-100 to-blue-200 px-1.5 sm:px-2 py-0.5 text-xs font-semibold text-blue-600 transition-all duration-200 group-hover:shadow-sm">
                    <span className="relative">
                      {bookings?.length}
                      {/* Subtle pulse animation for the badge */}
                      <span className="absolute left-0 top-0 h-full w-full animate-ping rounded-full bg-blue-400 opacity-20"></span>
                    </span>
                  </span>
                )}
              </span>

              {/* Subtle background highlight for active tab */}
              {isActive && (
                <span className="absolute inset-0 bg-blue-50 opacity-30"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabSelector;
