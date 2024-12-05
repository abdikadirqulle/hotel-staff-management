"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { checkIn, checkOut } from "@/lib/actions/attendance"

export function CheckInOutButton() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  async function handleCheckIn() {
    try {
      setIsLoading(true)
      await checkIn()
      toast({
        title: "Success",
        description: "Successfully checked in",
      })
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check in",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleCheckOut() {
    try {
      setIsLoading(true)
      await checkOut()
      toast({
        title: "Success",
        description: "Successfully checked out",
      })
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check out",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-x-2">
      <Button onClick={handleCheckIn} disabled={isLoading}>
        Check In
      </Button>
      <Button onClick={handleCheckOut} disabled={isLoading} variant="outline">
        Check Out
      </Button>
    </div>
  )
}
