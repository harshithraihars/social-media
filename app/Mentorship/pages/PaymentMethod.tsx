"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard } from "lucide-react"

export default function PaymentMethods() {
  const [paymentMethod, setPaymentMethod] = useState("card")

  return (
    <Tabs defaultValue="card" className="w-full" onValueChange={setPaymentMethod}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="card">Credit Card</TabsTrigger>
        <TabsTrigger value="razorpay">Razorpay</TabsTrigger>
      </TabsList>
      <TabsContent value="card" className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="cardName">Name on Card</Label>
          <Input id="cardName" placeholder="John Doe" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cardNumber">Card Number</Label>
          <div className="relative">
            <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
            <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiry">Expiry Date</Label>
            <Input id="expiry" placeholder="MM/YY" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cvc">CVC</Label>
            <Input id="cvc" placeholder="123" />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="razorpay" className="mt-4">
        <div className="border rounded-lg p-4 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            You'll be redirected to Razorpay to complete your payment securely.
          </p>
          <div className="flex justify-center mt-2">
            <img src="/placeholder.svg?height=40&width=120" alt="Razorpay" className="h-10" />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}