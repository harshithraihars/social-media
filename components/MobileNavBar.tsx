"use client"
import React from 'react'
import NavItems, { NAVITEMS, navItems } from "./NavItems"
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { getAllPost } from '@/lib/serveractions'
import { setPosts, setSearching } from '@/lib/feature/todos/todoSlice'

const MobileNavbar = () => {
    const isSearching=useAppSelector((state)=>state.counter.isSearching)
        const dispatch=useAppDispatch()
        const handleClick=async (navItem:NAVITEMS)=>{
            if(navItem.text==="Home"){
                if(isSearching){
                    const posts=await getAllPost()
                    dispatch(setSearching(false))
                    dispatch(setPosts(posts))
                }
            }
        }
  return (
<div className='md:hidden flex items-center justify-between fixed w-[100%] bottom-0 bg-white z-10 shadow-[0_-4px_6px_rgba(0,0,0,0.1)] py-2 px-2'>

        {
            navItems.map((navItem, index)=>{
                return (
                    <Link href={navItem.src} key={index} onClick={() => handleClick(navItem)}>
                      <div
                        
                        className="flex flex-col items-center cursor-pointer text-[#666666] hover:text-black"
                        
                      >
                        <span>{navItem.icon}</span>
                        <p className="text-xs">{navItem.text}</p>
                      </div>
                    </Link>
                  );
            })
        }
    </div>
  )
}

export default MobileNavbar