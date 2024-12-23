import NetworkFeed from '@/components/mynetwork/NetworkFeed'
import SideBar2 from '@/components/mynetwork/SideBar2'
import React from 'react'

const page = () => {
  return (
    <div className='mt-20 flex gap-2'>
      <SideBar2/>
      <NetworkFeed/>
    </div>
  )
}

export default page