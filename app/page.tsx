import ClientDataLoader from "@/components/ClientDataLoader";
import Feed from "@/components/Feed";
import News from "@/components/News";
import Sidebar from "@/components/Sidebar";
import { handleUSerConnections } from "@/lib/serverAction/userAction";


export default async function Home() {
  const userInfo=await handleUSerConnections()  
  return (
    <div className="pt-20">
      <div className="max-w-6xl mx-auto flex justify-center gap-8">
        <Sidebar/>
        <Feed userInfo={userInfo}/>
        <News/>
        <ClientDataLoader/>
      </div>
    </div>
  );
}

