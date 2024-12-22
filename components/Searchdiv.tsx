import { getAllUsers } from '@/lib/serveractions';
import { UserType } from '@/models/UserInfo';
import { Clock } from 'lucide-react';
import { ObjectId } from 'mongoose';
import React, { RefObject, useEffect, useState } from 'react'

const Searchdiv = ({ dropdownRef, input,setInput }: { dropdownRef: RefObject<HTMLDivElement>; input: string,setInput:React.Dispatch<React.SetStateAction<string>> }) => {
  const [suggestions, setSuggestions] = useState<UserType[]>([]);  // Suggestions are now User[]
  const [users, setUsers] = useState<UserType[]>([]);

  // Fetch users on component mount
//   getting all users
  useEffect(() => {
    async function getUsers() {
      let userData = await getAllUsers();
      setUsers(userData)
    }
    getUsers();
  }, []);

//   dynamicallygive suggetions based on the users input 
  useEffect(() => {
    const newSuggestions = users.filter((user) =>
      (user.firstName.toLowerCase() +" "+ user.lastName.toLowerCase()).startsWith(input.toLowerCase())
    );
    setSuggestions(newSuggestions);
  }, [input, users]);

  return (
    <div
          ref={dropdownRef}
          className="absolute left-0 right-0 mt-4 bg-white shadow-lg rounded-lg overflow-auto z-10 w-full md:w-96 h-fit"
        >
          <ul className=" divide-gray-200">
            <div className='flex items-center justify-between px-4 py-2'>
            <p>Recent</p>
            <p className='hover:cursor-pointer'>clear</p>
            </div>
            {suggestions.map((user, index) => (
              <li
                key={index}
                className="flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer"
              onClick={()=>setInput(user.firstName+user.lastName)}>
                <Clock size={20} className='text-gray-600'/>
                {/* Icon removed due to import issues */}
                <span>{user.firstName} {user.lastName}</span>
              </li>
            ))}
          </ul>
        </div>
  )
}

export default Searchdiv