
"use client"
import React, { useEffect } from 'react'
import Posts from './Posts'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { IPostDocument } from '@/models/post.model'
import { setPosts, setRequest } from '@/lib/feature/todos/todoSlice'
import { getAllRequests } from '@/lib/serveractions'

const PostHandler = ({ posts,userInfo }: { posts: IPostDocument[] ,userInfo:any}) => {

    const dispatch=useAppDispatch()
    const currentPost=useAppSelector((state)=>state.counter.posts)
    if(currentPost.length===0){
      dispatch(setPosts(posts))
    }

    useEffect(()=>{
      async function getRequest() {
            const requests = await getAllRequests();                            
            dispatch(setRequest(requests));
          }
          getRequest();
    })
  return (
    <div>
        <Posts userInfo={userInfo}/>
    </div>
  )
}

export default PostHandler