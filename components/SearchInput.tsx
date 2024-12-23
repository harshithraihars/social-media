// import React from 'react'
// import { Input } from './ui/input'

// const SearchInput = () => {
//   return (
//     <div>
//         <Input 
//         type="text" 
//         placeholder="Search" 
//         className="bg-[#EDF3F8] w-80 rounded-lg border-none"
//         />
//     </div>
//   )
// }

// export default SearchInput
"use client"
import { Input } from '@/components/ui/input'
import React, { useEffect, useRef, useState } from 'react'
import Searchdiv from './Searchdiv'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAppDispatch } from '@/lib/hooks'
import { getAllPost, getAllUsers } from '@/lib/serveractions'
import { setPosts, setSearching, setSearchUsers } from '@/lib/feature/todos/todoSlice'

const SearchInput = () => {
  const ref=useRef<HTMLButtonElement>(null)
  const dispatch=useAppDispatch()
  const [input,setInput]=useState<string>("")
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Handle focus and blur events
  const handleFocus = (): void => setIsFocused(true);
  const handleBlur = (): void => setIsFocused(false);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current && !inputRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleKey = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      ref.current?.click()
      const searchedUsers=await getAllUsers(input) 
      const posts=await getAllPost(input)
      dispatch(setPosts(posts))
      setIsFocused(false)
      dispatch(setSearchUsers(searchedUsers))
      dispatch(setSearching(true)) 
    }
  };
  return (
    <div className="relative w-80">
    <Input 
      type="text" 
      placeholder="Search" 
      className="bg-[#EDF3F8] w-[260px] rounded-lg border-none outline-none"
      onFocus={handleFocus}
      onBlur={handleBlur}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={handleKey}
    />
    <Link href={`/search/${input}`} className='hidden'>
    <button ref={ref}></button>
    </Link>
    {/* Dropdown appearing below the search box */}
    {isFocused && (
      <div className="absolute w-full mt-1 z-10">
        <Searchdiv dropdownRef={dropdownRef} input={input} setInput={setInput} />
      </div>
    )}
  </div>
  )
}

export default SearchInput