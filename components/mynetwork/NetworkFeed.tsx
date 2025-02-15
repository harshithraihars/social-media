"use client"
import { getAllRequests } from '@/lib/serveractions'
import React, { useEffect } from 'react'
import NetworkHeader from './NetworkHeader'
import Requests from "./Requests"
const NetworkFeed = () => {
  return (
    <div className='w-full'>
      <div className='flex flex-col gap-6'>
      <NetworkHeader/>
      <Requests/>
      </div>
    </div>
  )
}

export default NetworkFeed