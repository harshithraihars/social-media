// "use client"
// import { useAppDispatch } from '@/lib/hooks'
// import { IPostDocument } from '@/models/post.model'
// import React from 'react'
// import Posts from './Posts'
// import { setPosts } from '@/lib/feature/todos/todoSlice'

// const PostHandler = ({ posts,userInfo }: { posts: IPostDocument[] ,userInfo:any}) => {
//     const dispatch=useAppDispatch()
//     dispatch(setPosts(posts))
//   return (
//     <div>
//         <Posts userInfo={userInfo}/>
//     </div>
//   )
// }

// export default PostHandler
"use client"
import React from 'react'
import Posts from './Posts'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { IPostDocument } from '@/models/post.model'
import { setPosts } from '@/lib/feature/todos/todoSlice'

const PostHandler = ({ posts,userInfo }: { posts: IPostDocument[] ,userInfo:any}) => {
    const dispatch=useAppDispatch()
    const currentPost=useAppSelector((state)=>state.counter.posts)
    if(currentPost.length===0){
      dispatch(setPosts(posts))
    }
  return (
    <div>
        <Posts userInfo={userInfo}/>
    </div>
  )
}

export default PostHandler