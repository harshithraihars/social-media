"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '@/lib/hooks'
import { useUser } from '@clerk/nextjs'
import ProfilePhoto from './shared/ProfilePhoto'
import { postsSelectors} from '@/lib/feature/todos/todoSlice'

const Sidebar = () => {
    const [postCount, setPostCount] = useState<number>(0)
   const {user}=useUser();
    const posts = useAppSelector(postsSelectors.selectAll)
    
    useEffect(() => {
        if (user && posts) {
            const userPosts = posts.filter((post) => post.user.userId === user?.id)
            setPostCount(userPosts.length)
        }
    }, [user, posts])

    return (
        <div className='hidden md:block w-[20%] h-fit border bordergray-300 bg-white rounded-lg'>
            <div className='flex relative flex-col items-center'>
                <div className='w-full h-16 overflow-hidden'>
                    {
                        user && (
                            <Image
                                src={"/banner.jpg"}
                                alt="Banner"
                                width={200}
                                height={200}
                                className='w-full h-full rounded-t'
                            />
                        )
                    }
                </div>
                <div className='my-1 absolute top-10 left-[40%]'>
                    <ProfilePhoto src={user ? user?.imageUrl! : "/banner.jpg"} />
                </div>
                <div className='border-b border-b-gray-300'>
                    <div className='p-2 mt-5 text-center'>
                        <h1 className='font-bold hover:underline cursor-pointer'>{user ? `${user?.firstName} ${user?.lastName}` : "Patel Mern Stack"}</h1>
                        <p className='text-xs'>@{user?.firstName?.toLocaleLowerCase()}{user?.lastName?.toLowerCase()}</p>
                    </div>
                </div>
            </div>
            <div className='text-xs'>
                <div className='w-full flex justify-between items-center px-3 py-2 hover:bg-gray-200 cursor-pointer'>
                    <p>Post Impression</p>
                    <p className='text-blue-500 font-bold'>88</p>
                </div>
                <div className='w-full flex justify-between items-center px-3 py-2 hover:bg-gray-200 cursor-pointer'>
                    <p>Posts</p>
                    <p className='text-blue-500 font-bold'>{postCount}</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar