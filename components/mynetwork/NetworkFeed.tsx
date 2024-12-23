"use client"
import { getAllRequests } from '@/lib/serveractions'
import React, { useEffect } from 'react'
import NetworkHeader from './NetworkHeader'
import Requests from "./Requests"
const NetworkFeed = () => {
    useEffect(()=>{
        async function getRequests(){
            const requests=await getAllRequests()
            console.log(requests);
            
        }    
        getRequests()
    },[])
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