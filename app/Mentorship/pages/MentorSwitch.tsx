"use client"
import { AnimatePresence,motion } from 'framer-motion'
import React from 'react'
import MentorShipActivationCard from "../pages/MentorShipActivationCard"
import { useAppSelector } from '@/lib/hooks'
import Mentee from './Mentee'
const MentorSwitch = () => {
    const isMentorView=useAppSelector((state)=>state.counter.isMentor)
  return (
    <div>
        <AnimatePresence mode="popLayout">
        {isMentorView ? (
          <motion.div
            key="mentor"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            layout
          >
            <MentorShipActivationCard />
          </motion.div>
        ) : (
          <motion.div
            key="mentee"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            layout
          >
            <Mentee />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MentorSwitch