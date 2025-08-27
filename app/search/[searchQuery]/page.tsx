import React from 'react'
import { handleUSerConnections } from "@/lib/serverAction/userAction";
import { currentUser } from "@clerk/nextjs/server";
import Feed from '@/components/layout/Feed';
import News from '@/components/layout/News';
import Sidebar from '@/components/layout/Sidebar';

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