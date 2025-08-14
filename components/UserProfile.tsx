"use client";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Edit3, Settings } from "lucide-react";
import ProfileEdit from "@/app/Mentor/pages/EditProfile";
const UserProfile = () => {
  
  const {user}=useUser()
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleCloseModal = () => {
    setShowProfileModal(false);
  };

  const EditProfile = async () => {
    setShowProfileModal(true);
  };
  return (
    <>
      <div className="relative inline-block mr-4 md:mr-0">
        <SignedIn>
          <div className="relative w-fit group">
            <UserButton />
            <div className="absolute -top-2 -right-3 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md transform transition-transform duration-200 group-hover:scale-110">
              <Settings
                className="w-4 h-4  text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 cursor-pointer"
                onClick={EditProfile}
              />
            </div>
          </div>
        </SignedIn>

        <SignedOut>
          <Button
            className="rounded-full shadow-md hover:shadow-lg transition-all duration-200 px-6 py-2 font-medium"
            variant={"secondary"}
          >
            <SignInButton />
          </Button>
        </SignedOut>
      </div>
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

export default UserProfile;
