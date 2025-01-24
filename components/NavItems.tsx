// import { Bell, BriefcaseBusiness, Home, MessageCircleMore, Users } from 'lucide-react'
// import Link from 'next/link';
// import React from 'react';
// // method-1 to create type
// // type NAVITEMS = {
// //     src:string,
// //     icon:JSX.Element,
// //     text:string
// // }

// // m-2 to create type
// interface NAVITEMS {
//     src:string,
//     icon:JSX.Element,
//     text:string
// }

// const navItems:NAVITEMS[] = [
//     {
//         src: "/home",
//         icon: <Home />,
//         text: "Home",
//     },
//     {
//         src: "/networks",
//         icon: <Users />,
//         text: "My Network",
//     },
//     {
//         src: "/job",
//         icon: <BriefcaseBusiness />,
//         text: "Jobs",
//     },
//     {
//         src: "/message",
//         icon: <MessageCircleMore />,
//         text: "Messaging",
//     },
//     {
//         src: "/notification",
//         icon: <Bell />,
//         text: "Notification",
//     },
// ]

// const NavItems = () => {
//   return (
//     <div className='flex gap-8'>
//         {
//             navItems.map((navItem, index)=>{
//                 return (
//                     <div key={index} className='flex flex-col items-center cursor-pointer text-[#666666] hover:text-black'>
//                         <span>{navItem.icon}</span>
//                         <Link className='text-xs' href={navItem.src}>{navItem.text}</Link>
//                     </div>
//                 )
//             })
//         }
//     </div>
//   )
// }

// export default NavItems
"use client";
import React from "react";
import {
  Home,
  Users,
  BriefcaseBusiness,
  MessageCircleMore,
  Bell,
} from "lucide-react";
import Link from "next/link";
import { useAppDispatch } from "@/lib/hooks";
import {
  setisInput,
  setisLoading,
  setPosts,
  setSearching,
} from "@/lib/feature/todos/todoSlice";
import { getAllPost } from "@/lib/serveractions";
export type NAVITEMS = {
  src: string;
  icon: JSX.Element;
  text: string;
};
// another way of specifying the type
// interface NAVITEMS{
//     src:String,
//     icon:JSX.Element,
//     text:String
// }
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
    src: "/job",
    icon: <BriefcaseBusiness />,
    text: "jobs",
  },
  {
    src: "/message",
    icon: <MessageCircleMore />,
    text: "messaging",
  },
  {
    src: "/notofication",
    icon: <Bell />,
    text: "notification",
  },
];
const NavItem = () => {
  const dispatch = useAppDispatch();
  const handleClick = async (item: NAVITEMS) => {
    dispatch(setisInput(""))
    dispatch(setSearching(false))
    // Start loading immediately after clicking
    dispatch(setisLoading(true));
    if (item.text === "Home") {
      dispatch(setSearching(false));

      // Fetch posts and update the state
      const posts = await getAllPost();
      dispatch(setPosts(posts));
    }

    // Stop loading after the posts are fetched
    dispatch(setisLoading(false));
  };
  return (
    <div className="flex gap-8">
      {navItems.map((navItem, index) => {
        return (
          <div key={index} onClick={() => handleClick(navItem)}>
            <Link href={navItem.src}>
              <div
                className="flex flex-col items-center cursor-pointer text-[#666666] hover:text-black"
              >
                <span>{navItem.icon}</span>
                <p className="text-xs">{navItem.text}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default NavItem;
