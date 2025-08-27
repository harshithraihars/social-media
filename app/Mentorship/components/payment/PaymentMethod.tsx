"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, CheckCircle } from "lucide-react"

export default function PaymentMethods() {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [focused, setFocused] = useState<string | null>(null)

  return (
    <Tabs defaultValue="card" className="w-full" onValueChange={setPaymentMethod}>
      <TabsList className="grid w-full grid-cols-2 p-1 bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-800">
        <TabsTrigger
          value="card"
          className={`transition-all duration-300 ${
            paymentMethod === "card"
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md font-medium"
              : "hover:bg-blue-50 dark:hover:bg-blue-900/30"
          }`}
        >
          <CreditCard className="h-4 w-4 mr-2" />
          Credit Card
        </TabsTrigger>
        <TabsTrigger
          value="razorpay"
          className={`transition-all duration-300 ${
            paymentMethod === "razorpay"
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md font-medium"
              : "hover:bg-blue-50 dark:hover:bg-blue-900/30"
          }`}
        >
          <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
            <path d="M2 17L12 22L22 17" fill="currentColor" />
            <path d="M2 12L12 17L22 12" fill="currentColor" />
          </svg>
          Razorpay
        </TabsTrigger>
      </TabsList>
      <TabsContent value="card" className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="cardName" className="text-blue-700 dark:text-blue-400 font-medium">
            Name on Card
          </Label>
          <Input
            id="cardName"
            placeholder="John Doe"
            className={`transition-all duration-300 border-blue-200 dark:border-blue-800 focus:border-blue-500 focus:ring-blue-300 ${
              focused === "name" ? "bg-blue-50 dark:bg-blue-900/20 shadow-sm" : "hover:border-blue-300"
            }`}
            onFocus={() => setFocused("name")}
            onBlur={() => setFocused(null)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cardNumber" className="text-blue-700 dark:text-blue-400 font-medium">
            Card Number
          </Label>
          <div className="relative">
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              className={`transition-all duration-300 border-blue-200 dark:border-blue-800 focus:border-blue-500 focus:ring-blue-300 ${
                focused === "number" ? "bg-blue-50 dark:bg-blue-900/20 shadow-sm" : "hover:border-blue-300"
              }`}
              onFocus={() => setFocused("number")}
              onBlur={() => setFocused(null)}
            />
            <CreditCard
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-300 ${
                focused === "number" ? "text-blue-500" : "text-muted-foreground"
              }`}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiry" className="text-blue-700 dark:text-blue-400 font-medium">
              Expiry Date
            </Label>
            <Input
              id="expiry"
              placeholder="MM/YY"
              className={`transition-all duration-300 border-blue-200 dark:border-blue-800 focus:border-blue-500 focus:ring-blue-300 ${
                focused === "expiry" ? "bg-blue-50 dark:bg-blue-900/20 shadow-sm" : "hover:border-blue-300"
              }`}
              onFocus={() => setFocused("expiry")}
              onBlur={() => setFocused(null)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cvc" className="text-blue-700 dark:text-blue-400 font-medium">
              CVC
            </Label>
            <Input
              id="cvc"
              placeholder="123"
              className={`transition-all duration-300 border-blue-200 dark:border-blue-800 focus:border-blue-500 focus:ring-blue-300 ${
                focused === "cvc" ? "bg-blue-50 dark:bg-blue-900/20 shadow-sm" : "hover:border-blue-300"
              }`}
              onFocus={() => setFocused("cvc")}
              onBlur={() => setFocused(null)}
            />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="razorpay" className="mt-4">
        <div className="border border-blue-200 dark:border-blue-800 rounded-lg p-6 text-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-blue-900/30 dark:via-blue-900/20 dark:to-blue-800/20 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
            <CheckCircle className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-medium text-blue-700 dark:text-blue-400 mb-2">Fast & Secure Checkout</h3>
          <p className="text-sm text-muted-foreground mb-4">
            You'll be redirected to Razorpay to complete your payment securely.
          </p>
          <div className="flex justify-center mt-4">
            <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-md shadow-sm hover:shadow-md transition-all duration-300 inline-flex items-center">
              <img src="/placeholder.svg?height=40&width=120" alt="Razorpay" className="h-8" />
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}

