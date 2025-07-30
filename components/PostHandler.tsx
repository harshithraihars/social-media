
"use client"
import React, { useEffect } from 'react'
import Posts from './Posts'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { IPostDocument } from '@/models/post.model'
import { setPosts, setRequest, setUser } from '@/lib/feature/todos/todoSlice'
import { getAllRequests, getCurrentUser } from '@/lib/serverAction/userAction'

const PostHandler = ({ posts,userConnections,requests }: { posts: IPostDocument[] ,userConnections:any,requests:any}) => {

    const dispatch=useAppDispatch()
    const currentPost=useAppSelector((state)=>state.counter.posts)
    if(currentPost.length===0){
      dispatch(setPosts(posts))
    }

    useEffect(()=>{
      async function handleData() {        
            dispatch(setRequest(requests));
          }
          handleData();
    })


  return (
    <div>
        <Posts userConnections={userConnections}/>
    </div>
  )
}

export default PostHandler