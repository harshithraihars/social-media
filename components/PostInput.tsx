"use client"
import React, { useState } from 'react'
import { PostDialog } from './PostDialog'
import { Input } from '@/components/ui/input'
import { useAppSelector } from '@/lib/hooks'
import ProfilePhoto from './shared/ProfilePhoto'
import { usePathname } from 'next/navigation'
interface User{
  imageUrl:string
}
const PostInput = () => {
  const user=useAppSelector((state)=>state.counter.user)
    const [open,setOpen]=useState<boolean>(false)
    const inputHandler=()=>{
        setOpen(true)
    }
    const isSearching=usePathname().startsWith("/search")
  return (
    <div>
            {!isSearching?(
                <div className='bg-white p-4 m-2 md:m-0 border border-gray-300 rounded-lg'>
                <div className='flex items-center gap-3'>
                    <ProfilePhoto src={user?.profilePhoto??"/placeholder.svg"} />
                    <Input
                        type="text"
                        placeholder='Start a post'
                        className='rounded-full hover:bg-gray-100 h-12 cursor-pointer'
                        onClick={inputHandler}
                    />
                </div>
                <PostDialog setOpen={setOpen} open={open} src={user?.profilePhoto??"/placeholder.svg"}/>
            </div>
            ):""}
        </div>
  )
}

export default PostInput