import React from 'react'
import { handleUSerConnections } from "@/lib/serverAction/userAction";
import { currentUser } from "@clerk/nextjs/server";
import Sidebar from '@/components/Sidebar';
import Feed from '@/components/Feed';
import News from '@/components/News';
import Loader from '@/components/Loader';

type Props = {
  params: {
    searchQuery: string;
  };
};

const page = async ({ params }: Props) => {
  const { searchQuery } = params;    
  return (
    <div className="">
      <div className="pt-20 max-w-6xl mx-auto flex justify-center gap-8">
        <Sidebar/>
        <Feed searchQuery={searchQuery}/>
        <News/>
      </div>
    </div>
  );
}

export default page