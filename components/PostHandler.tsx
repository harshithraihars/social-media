
"use client"
import React, { useEffect } from 'react'
import Posts from './Posts'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { IPostDocument } from '@/models/post.model'
import { setPosts, setRequest, setUser } from '@/lib/feature/todos/todoSlice'
import { getAllRequests, getCurrentUser } from '@/lib/serverAction/userAction'

const PostHandler = ({ posts,userInfo }: { posts: IPostDocument[] ,userInfo:any}) => {

    const dispatch=useAppDispatch()
    const currentPost=useAppSelector((state)=>state.counter.posts)
    if(currentPost.length===0){
      dispatch(setPosts(posts))
    }

    useEffect(()=>{
      async function handleData() {
            const user=await getCurrentUser()            
            const requests = await getAllRequests();   
            dispatch(setUser(user))                         
            dispatch(setRequest(requests));
          }
          handleData();
    })


  return (
    <div>
        <Posts userInfo={userInfo}/>
    </div>
  )
}

export default PostHandler