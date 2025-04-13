"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
const Page = () => {
    const [rating, setRating] = useState(4)

    return (
      <div className="flex justify-center items-start min-h-screen bg-gray-100">
        <Card className="w-full max-w-md p-6 shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Feedback Form</h2>
          <CardContent className="space-y-4">
            <div>
              <Label className="mb-3" htmlFor="name">Name</Label>
              <div className="relative">
                <span className="absolute left-3 top-1.5 text-gray-400">
                  👤
                </span>
                <Input
                  id="name"
                  placeholder="Your name"
                  className="pl-10"
                />
              </div>
            </div>
  
            <div>
              <Label className="mb-3" htmlFor="email">Email Address</Label>
              <div className="relative">
                <span className="absolute left-3 top-1.5 text-gray-400">
                  📧
                </span>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                />
              </div>
            </div>
  
            <div>
              <Label className="mb-3">Share your experience in scaling</Label>
              <div className="flex space-x-1 mt-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    onClick={() => setRating(index + 1)}
                    className={cn(
                      "w-6 h-6 cursor-pointer",
                      index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    )}
                  />
                ))}
              </div>
            </div>
  
            <div>
              <Textarea placeholder="Add your comments..." />
            </div>
  
            <div className="flex justify-between items-center pt-2">
              <Button variant="link" className="text-blue-600">Cancel</Button>
              <Button className="bg-blue-500 text-white hover:bg-blue-600">Submit</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
}

export default Page