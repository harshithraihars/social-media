"use client";
import React, { useEffect, useState } from "react";
import { Handshake, ChalkboardTeacher } from "phosphor-react";
import {
  Home,
  Users,
  BriefcaseBusiness,
  MessageCircleMore,
  Bell,
  UserCog,
  CalendarCheck2,
} from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  setisLoading,
  setRequest,
} from "@/lib/feature/todos/todoSlice";
import NotificationPopup from "./Notification";
import { getAllPost } from "@/lib/serverAction/postAction";
export type NAVITEMS = {
  src: string;
  icon: JSX.Element;
  text: string;
};

export const navItems: NAVITEMS[] = [
  {
    src: "/",
    icon: <Home />,
    text: "Home",
  },
  {
    src: "/mynetwork",
    icon: <Users />,
    text: "My Network",
  },
  {
    src: "/Mentor",
    icon: <CalendarCheck2/>,
    text: "Mentor",
  },
  {
    src: "/Mentorship",
    icon: <ChalkboardTeacher size={28}/>,
    text: "Mentorship",
  },
  {
    src: "#",
    icon: <Bell />,
    text: "Notification",
  },
];

// export default NavItem;
const NavItem = () => {
  const [notifications, setNotifications] = useState(0);
  const [popup, setPopup] = useState(false);
  const [isActive, setIsActive] = useState("Home");
  const dispatch = useAppDispatch();
  const ConnectionRequests = useAppSelector(
    (state) => state.counter.ConnectionRequest?.length
  );
  const handleClick = async (item: NAVITEMS) => {
    setIsActive(item.text);
    // dispatch(setisInput(""));
    // dispatch(setSearching(false));

    if (item.text === "Home") {
      // dispatch(setSearching(false));
    }
    if (item.text == "Notification") {
      setNotifications(0)
      setPopup(!popup);
    }

    dispatch(setisLoading(false));
  };

  useEffect(() => {
    setNotifications(ConnectionRequests);
  }, [ConnectionRequests]);
  return (
    <div className="flex gap-8 relative">
      {navItems.map((navItem, index) => {
        return (
          <div
            key={index}
            className="relative"
            onClick={() => handleClick(navItem)}
          >
            <Link href={navItem.src}>
              <div
                className={`flex flex-col items-center cursor-pointer text-[#666666] hover:text-black ${
                  navItem.text == isActive ? "text-black" : ""
                }`}
              >
                <span className="relative">
                  {navItem.icon}
                  {navItem.text === "Notification" && notifications > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                      {notifications}
                    </span>
                  )}
                </span>
                <p className="text-xs">{navItem.text}</p>
              </div>
            </Link>
            {navItem.text === "Notification" && popup && (
              <div className="absolute top-10 left-0" onClick={(e) => e.stopPropagation()}>
                <NotificationPopup />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default NavItem;
