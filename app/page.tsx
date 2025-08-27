import Feed from "@/components/layout/Feed";
import News from "@/components/layout/News";
import Sidebar from "@/components/layout/Sidebar";


export default async function Home() {
  return (
    <div className="pt-20">
      <div className="max-w-6xl mx-auto flex justify-center gap-8">
        <Sidebar/>
        <Feed/>
        <News/>
      </div>
    </div>
  );
}

