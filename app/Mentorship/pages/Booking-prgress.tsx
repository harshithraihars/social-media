"use client"

import { useState, useEffect } from "react"
import { CheckCircle } from "lucide-react"

interface BookingProgressProps {
  currentStep: number
  steps: string[]
}

export default function BookingProgress({ currentStep, steps }: BookingProgressProps) {
  const [animateProgress, setAnimateProgress] = useState(false)

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setAnimateProgress(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Calculate the percentage width for the progress bar
  const calculateProgressWidth = () => {
    if (steps.length <= 1) return "0%"
    
    // For the first step, show a small initial progress
    if (currentStep === 0) return "0%"
    
    // For steps in between, calculate proportional progress
    // Subtract 1 from denominator to ensure it reaches 100% at the last step
    const segments = steps.length - 1
    const percentage = ((currentStep) / segments) * 100
    
    return `${percentage}%`
  }

  return (
    <div className="w-full mb-8 hidden md:block">
      <div className="relative">
        {/* Progress bar background - adjusted to align with circles */}
        <div className="absolute top-5 left-5 right-5 h-1 bg-blue-100 dark:bg-blue-900/30 rounded-full"></div>

        {/* Animated progress - adjusted left offset */}
        <div
          className="absolute top-5 left-5 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 ease-out"
          style={{ 
            width: animateProgress ? calculateProgressWidth() : "0%",
            maxWidth: "calc(100% - 10px)" // Ensure it doesn't overflow
          }}
        ></div>

        {/* Steps */}
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center relative">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-300 ${
                  index < currentStep
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md"
                    : index === currentStep
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                      : "bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-800 text-blue-400"
                }`}
              >
                {index < currentStep ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <span
                className={`text-xs mt-2 font-medium ${
                  index <= currentStep ? "text-blue-700 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"
                }`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}