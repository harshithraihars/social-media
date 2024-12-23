// import React from 'react'
// import PostInput from './PostInput'
// import Posts from './Posts'
// import { getAllPosts } from '@/lib/serveractions';
// import PostHandler from './PostHandler';

// const Feed = async ({user,userInfo}:{user:any,userInfo:any}) => {
//     const userData = JSON.parse(JSON.stringify(user));
//     const posts = await getAllPosts();
//     let userInfoClient;
//     if(userInfo){
//       userInfoClient=JSON.parse(JSON.stringify(userInfo))
//     }
//     const parsedPosts=JSON.parse(JSON.stringify(posts))
//   return (
//     <div className='flex-1'>
//         <PostInput user={userData}/>
//         <PostHandler posts = {parsedPosts!} userInfo={userInfoClient}/>
        
//     </div>
//   )
// }

// export default Feed
import React from 'react'
import PostInput from './PostInput'
import Posts from './Posts'
import { getAllPost } from '@/lib/serveractions'
import PostHandler from './PostHandler'
import SearchResult from './SearchResult'
interface User{
  imageUrl:string
}
const Feed = async ({user,userInfo}:{user:User,userInfo:any}) => {
  // you cant send plain object from server to client
  const userData=JSON.parse(JSON.stringify(user))
  const posts=await getAllPost()
  const parsedPosts=JSON.parse(JSON.stringify(posts))
  let userInfoClient;
    if(userInfo){
      userInfoClient=JSON.parse(JSON.stringify(userInfo))
    }
  return (
    <div className="w-full max-w-screen-lg mx-auto">
  <div className="flex-1">
    <SearchResult />
    <PostInput user={userData} />
    <PostHandler posts={parsedPosts} userInfo={userInfoClient} />
  </div>
</div>

  )
}

export default Feed