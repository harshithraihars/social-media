// export default Posts
import React, { useState } from 'react'
import Post from './Post'
import { useAppSelector } from '@/lib/hooks';
import { postsSelectors } from '@/lib/feature/todos/todoSlice';


const Posts = ({userConnections}:{userConnections:any}) => {
  const [isFollowing, setIsFollowing] = useState<string[]>([]); 

  const posts=useAppSelector(postsSelectors.selectAll)
  
  return (
    <div>
      {
       posts?.map((post,index) => {
        return (
          <Post key={post._id} post={post} userConnections={userConnections} isFollowing={isFollowing} setIsFollowing={setIsFollowing} index={index}/>
        )
      })
      }
    </div>
  )
}

export default Posts