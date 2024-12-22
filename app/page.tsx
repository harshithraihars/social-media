// import Feed from "@/components/Feed";
// import News from "@/components/News";
// import Sidebar from "@/components/Sidebar";
// import { handleUSerConnections } from "@/lib/serveractions";
// import { currentUser } from "@clerk/nextjs/server";

 
// export default async function Home() {
//   const user = await currentUser();
//   const userInfo=await handleUSerConnections(user)  
   
//   return (
//      <div className="pt-20">
//       <div className="max-w-6xl mx-auto flex justify-between gap-8">
//           {/* Sidebar  */}
//           <Sidebar user = {user}/>
//           {/* Feed  */}
//           <Feed user={user} userInfo={userInfo}/>
//           {/* News  */}
//           <News/>
//       </div>
//      </div>
//   );
// }
import Feed from "@/components/Feed";
import News from "@/components/News";
import Sidebar from "@/components/Sidebar";
import { handleUSerConnections } from "@/lib/serveractions";

import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const userDoc=await currentUser();
  const user=JSON.parse(JSON.stringify(userDoc))
  const userInfo=await handleUSerConnections(user)  
  return (
    <div className="pt-20">
      <div className="max-w-6xl mx-auto flex justify-center gap-8">
        <Sidebar user={user}/>
        <Feed user={user!} userInfo={userInfo}/>
        <News/>
      </div>
    </div>
  );
}

