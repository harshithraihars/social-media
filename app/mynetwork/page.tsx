
import Loader from '@/components/Loader'
import NetworkFeed from '@/components/mynetwork/NetworkFeed'
import SideBar2 from '@/components/mynetwork/SideBar2'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <div className='mt-20 flex gap-2'>
      <Suspense fallback={<Loader/>}>
      <SideBar2/>
      <NetworkFeed/>
      </Suspense>
    </div>
  )
}

export default page