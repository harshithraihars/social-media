"use client";
import React, { useState } from "react";
import { X, Users, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import ProfileEdit from "./EditProfile"; // Import the ProfileEdit component
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setUserProfile } from "@/lib/feature/todos/todoSlice";

const MentorshipCard = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false); // State to control modal visibility
  const userProfile=useAppSelector((state)=>state.counter.userProfile)
  const dispatch=useAppDispatch();
  if (!isVisible) return null;

  // Function to handle enabling mentorship
  const handleEnableMentorship = () => {
    dispatch(setUserProfile({...userProfile,MentorshipEnabled:true}))
    setShowProfileModal(true); // Show the profile edit modal
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowProfileModal(false);
  };

  return (
    <>
      <div className="w-screen md:max-w-4xl lg:max-w-7xl mx-auto p-2 sm:p-6">
        <Card className="relative overflow-hidden bg-gradient-to-br from-blue-100 to-blue-400 dark:from-gray-900 dark:to-gray-800 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.01] sm:hover:scale-[1.02] border border-blue-100 dark:border-blue-900">
          <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-sm" />

          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-2 sm:right-4 top-2 sm:top-4 p-1 sm:p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <X size={16} className="sm:w-5 sm:h-5" />
          </button>

          <CardContent className="relative p-3 sm:p-8 pt-6 sm:pt-12">
            <div className="flex flex-col gap-3 sm:gap-6">
              <div className="flex items-start gap-3 sm:gap-6">
                <div className="rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 p-2 sm:p-4 mt-1 dark:from-blue-900 dark:to-blue-800 transform transition-transform duration-300 hover:scale-110">
                  <Users className="h-5 w-5 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight mt-1">
                    Enable Mentorship to Start Accepting Bookings
                  </h3>
                </div>
              </div>

              <div className="px-2 sm:px-14">
                <p className="text-xs sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                  Share your expertise and help others grow. Enable mentorship
                  to start receiving booking requests from potential mentees.
                </p>

                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between gap-3 sm:gap-4 w-full">
                    <div className="flex items-center gap-2 group">
                      <Switch
                        checked={isEnabled}
                        onCheckedChange={setIsEnabled}
                        className="data-[state=checked]:bg-blue-600 transition-colors duration-200"
                      />
                      <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                        {isEnabled
                          ? "Mentorship Enabled"
                          : "Mentorship Disabled"}
                      </span>
                    </div>

                    <Button
                      variant="default"
                      className="text-white px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-200 hover:shadow-lg hover:translate-y-[-2px] active:translate-y-0 whitespace-nowrap"
                      onClick={handleEnableMentorship}
                    >
                      Enable Mentorship
                    </Button>
                  </div>

                  <div>
                    <button className="flex items-center text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 group transition-colors duration-200">
                      Mentorship Settings
                      <ChevronRight
                        size={14}
                        className="ml-1 transform transition-transform duration-200 group-hover:translate-x-1 sm:w-4 sm:h-4"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-all duration-300 ease-in-out hover:shadow-xl border border-blue-100 dark:border-blue-900 mt-4 sm:mt-6">
          {/* <BookingsPage /> */}
        </div>
      </div>

      {/* Modal Overlay for ProfileEdit */}
      {showProfileModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Dark overlay with blur effect */}
          <div
            className="absolute inset-0 bg-indigo-900/30 backdrop-blur-sm"
            onClick={handleCloseModal}
          />

          {/* Modal content - Updated to take full width on small screens */}
          <div className="relative z-10 w-full max-w-3xl px-0 md:px-4 animate-fadeIn">
            <div className="relative">
              {/* The Enhanced ProfileEdit component with onClose prop */}
              <ProfileEdit onClose={handleCloseModal} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MentorshipCard;
