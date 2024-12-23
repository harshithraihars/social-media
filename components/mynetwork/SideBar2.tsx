"use client"
import React, { useEffect, useState } from 'react';
import { Users, UserPlus, Bell, Share, Rss, ChevronDown ,CalendarDays,NotepadText,Mails} from 'lucide-react';
import { useAppSelector } from '@/lib/hooks';

const SideBar2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user=useAppSelector((state)=>state.counter.user)
  const toggleMenu = () => setIsOpen((prev) => !prev);
  useEffect(()=>{
    console.log(user);
    
  },[user])
  // Menu items data
  const menuItems = [
    { icon: <UserPlus size={16} />, label: 'Connections' },
    { icon: <UserPlus size={16} />, label: 'Following & Followers' },
    { icon: <Share size={16} />, label: 'Groups' },
    { icon: <CalendarDays size={16} />, label: 'Events' },
    { icon: <NotepadText size={16} />, label: 'Page' },
    { icon: <Mails size={16} />, label: 'Newsletter' },
  ];

  return (
    <div className="hidden md:block w-80 p- bg-gray-50 rounded-lg shadow-md max-h-16">
      <div className='flex items-center justify-between px-2'>
        <h2 className="text-md font-md">Manage My Network</h2>
        <button
          className="flex items-center p-3 text-white rounded-lg focus:outline-none"
          onClick={toggleMenu}
        >
          <ChevronDown size={20} className='text-gray-500'/>
        </button>
      </div>
      <div className="relative">
        {isOpen && (
          <ul className="absolute left-0 top-full mt-0 bg-white shadow-lg rounded-lg w-full">
            {menuItems.map((item, index) => (
              <li key={index} className="flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer">
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SideBar2;

