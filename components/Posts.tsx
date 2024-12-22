// "use client"
// import React, { useState } from 'react'
// import Post from './Post'
// import { IPostDocument } from '@/models/post.model'
// import { useAppSelector } from '@/lib/hooks'

// const Posts = ({ userInfo }: { userInfo: any }) => {
//   const posts=useAppSelector((state)=>state.counter.posts)
//   const [isFollowing, setIsFollowing] = useState<string[]>([]); 

//   return (
//     <div>
//       {
//         posts?.map((post,index) => {
//           return (
//             <Post key={index} post={post} userInfo={userInfo} isFollowing={isFollowing} setIsFollowing={setIsFollowing} index={index}/>
//           )
//         })
//       }
//     </div>
//   )
// }

// export default Posts
import React, { useState } from 'react'
import Post from './Post'
import { useAppSelector } from '@/lib/hooks';


const Posts = ({userInfo}:{userInfo:any}) => {
  const [isFollowing, setIsFollowing] = useState<string[]>([]); 

  const posts=useAppSelector((state)=>state.counter.posts)
  return (
    <div>
      {
       posts?.map((post,index) => {
        return (
          <Post key={index} post={post} userInfo={userInfo} isFollowing={isFollowing} setIsFollowing={setIsFollowing} index={index}/>
        )
      })
      }
    </div>
  )
}

export default Posts