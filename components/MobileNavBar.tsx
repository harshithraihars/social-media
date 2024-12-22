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
                    dispatch(setSearching(false))
                    const posts=await getAllPost()
                    dispatch(setPosts(posts))
                }
            }
        }
  return (
<div className='md:hidden flex items-center justify-between fixed w-[100%] bottom-0 bg-white z-10 shadow-[0_-4px_6px_rgba(0,0,0,0.1)] py-2 px-2'>

        {
            navItems.map((navItem, index)=>{
                return (
                    <div key={index} className='flex flex-col items-center cursor-pointer text-[#666666] hover:text-black' onClick={()=>handleClick(navItem)}>
                        <span>{navItem.icon}</span>
                        <Link className='text-xs' href={navItem.src}>{navItem.text}</Link>
                    </div>
                )
            })
        }
    </div>
  )
}

export default MobileNavbar