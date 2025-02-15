"use client";
import React, { useEffect, useState } from "react";
import NavItems, { NAVITEMS, navItems } from "./NavItems";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getAllPost } from "@/lib/serveractions";
import {
  setisInput,
  setisLoading,
  setPosts,
  setSearching,
} from "@/lib/feature/todos/todoSlice";
import MobileNotificationPopup from "./MobileNotificationPopup";

const MobileNavbar = () => {
  const [notifications, setNotifications] = useState(0);
  const ConnectionRequests=useAppSelector((state)=>state.counter.ConnectionRequest)
  useEffect(() => {
    setNotifications(ConnectionRequests.length);
  }, [ConnectionRequests]);
  const dispatch = useAppDispatch();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleClick = async (item: NAVITEMS) => {
    dispatch(setisInput(""));
    dispatch(setSearching(false));

    if (item.text === "Home") {
      dispatch(setSearching(false));
      const posts = await getAllPost();
      dispatch(setPosts(posts));
      dispatch(setisLoading(false));
    }

    // Toggle notification popup
    if (item.text === "Notification") {
      setNotifications(0);
      setIsPopupOpen((prev) => !prev);
    }
  };

  return (
    <>
      <div className="md:hidden flex items-center justify-between fixed bottom-0 w-full bg-white z-50 shadow-[0_-2px_8px_rgba(0,0,0,0.15)] py-3 px-4">
        {navItems.map((navItem, index) => (
          <Link
            href={navItem.src}
            key={index}
            onClick={() => handleClick(navItem)}
            className="flex flex-col items-center cursor-pointer text-gray-600 hover:text-black transition-all relative"
          >
            <span className="relative inline-block">
              {navItem.icon}
              {/* <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                  {notifications}
                </span> */}
              {navItem.text === "Notification" && notifications>0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                  {notifications}
                </span>
              )}
            </span>
            <p className="text-xs mt-1">{navItem.text}</p>
          </Link>
        ))}
      </div>

      {/* Mobile Notification Popup */}
      <MobileNotificationPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </>
  );
};

export default MobileNavbar;

