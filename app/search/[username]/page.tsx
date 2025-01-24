import React from 'react'
import { handleUSerConnections } from "@/lib/serveractions";
import { currentUser } from "@clerk/nextjs/server";
import Sidebar from '@/components/Sidebar';
import Feed from '@/components/Feed';
import News from '@/components/News';
import Loader from '@/components/Loader';


const page = async () => {
  const userDoc=await currentUser();
  const user=JSON.parse(JSON.stringify(userDoc))
  const userInfo=await handleUSerConnections(user)  
  return (
    <div className="pt-36">
      <div className="max-w-6xl  flex justify-center gap-8 w-full">
        <Loader/>
        <Sidebar user={user}/>
        <Feed user={user} userInfo={userInfo}/>
        <News/>
      </div>
    </div>
  );
}

export default page