"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Calendar, Clock, CreditCard } from "lucide-react"

interface BookingProgressProps {
  date: Date | undefined
  timeSlot: string | null
  duration: string
  isPaymentComplete: boolean
}

export default function BookingProgress({ 
  date, 
  timeSlot, 
  duration, 
  isPaymentComplete 
}: BookingProgressProps) {
  const [animateProgress, setAnimateProgress] = useState(false)

  const steps = [
    { id: 'datetime', label: 'Date & Time', icon: Calendar },
    { id: 'duration', label: 'Duration', icon: Clock },
    { id: 'payment', label: 'Payment', icon: CreditCard }
  ]

  // Determine current step based on completed actions
  const getCurrentStep = () => {
    if (isPaymentComplete) return 3 // All completed
    if (date && timeSlot && duration) return 2 // Ready for payment
    if (date && timeSlot) return 1 // DateTime completed, duration next
    return 0 // Nothing completed yet
  }

  const currentStep = getCurrentStep()

  // Calculate progress bar width (0% to 100%)
  const calculateProgressWidth = () => {
    const totalSteps = steps.length
    if (currentStep === 0) return 0
    
    // Progress fills to the completed step
    const progressPercentage = (currentStep / (totalSteps - 1)) * 100
    return Math.min(progressPercentage, 100)
  }

  // Get status of each step
  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentStep) return 'completed'
    if (stepIndex === currentStep && currentStep > 0) return 'completed'
    if (stepIndex === currentStep) return 'current'
    return 'pending'
  }

  // Check if step is completed
  const isStepCompleted = (stepIndex: number) => {
    switch (stepIndex) {
      case 0: return !!(date && timeSlot)
      case 1: return !!(date && timeSlot && duration)
      case 2: return isPaymentComplete
      default: return false
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateProgress(true)
    }, 150)
    return () => clearTimeout(timer)
  }, [currentStep])

  return (
    <div className="w-full mb-8 hidden md:block">
      <div className="relative px-4">
        {/* Background line connecting all circles */}
        <div 
          className="absolute top-6 h-0.5 bg-gray-200 dark:bg-gray-700"
          style={{ 
            left: '36px', 
            right: '36px',
            width: 'calc(100% - 72px)'
          }}
        />

        {/* Animated progress line */}
        <div
          className="absolute top-6 h-0.5 bg-gradient-to-r from-blue-600 to-blue-700 transition-all duration-1000 ease-out"
          style={{ 
            left: '36px',
            width: animateProgress ? `${calculateProgressWidth()}%` : '0%',
            maxWidth: 'calc(100% - 72px)',
            transformOrigin: 'left center'
          }}
        />

        {/* Step circles and labels */}
        <div className="flex justify-between relative">
          {steps.map((step, index) => {
            const isCompleted = isStepCompleted(index)
            const isCurrent = index === currentStep && !isCompleted
            const Icon = step.icon
            
            return (
              <div key={step.id} className="flex flex-col items-center relative z-10">
                {/* Circle */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                    isCompleted
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/50'
                      : isCurrent
                        ? 'bg-white dark:bg-gray-800 border-blue-500 text-blue-600 dark:text-blue-400 shadow-md ring-2 ring-blue-200 dark:ring-blue-800'
                        : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>

                {/* Step label */}
                <div className="mt-3 text-center">
                  <p className={`text-sm font-medium transition-colors duration-300 ${
                    isCompleted 
                      ? 'text-blue-700 dark:text-blue-400' 
                      : isCurrent
                        ? 'text-blue-600 dark:text-blue-500'
                        : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {step.label}
                  </p>
                  
                  {/* Status indicator */}
                  <div className={`mt-1 h-1 w-8 mx-auto rounded-full transition-all duration-300 ${
                    isCompleted
                      ? 'bg-blue-600'
                      : isCurrent
                        ? 'bg-blue-400'
                        : 'bg-gray-200 dark:bg-gray-600'
                  }`} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}