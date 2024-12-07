"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ActivityIcon, ShieldMinus, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import { useToast } from "@/hooks/use-toast"
import type { Staff } from "@prisma/client"
import { deactivateStaff } from "@/lib/actions/staff"

interface DeactivateStaffDialogProps {
  staff: Staff
  onDeactivate: (id: string) => void
}

export function DeactivateStaffDialog({
  staff,
  onDeactivate,
}: DeactivateStaffDialogProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  async function handleDeactivate() {
    try {
      setIsLoading(true)
      await deactivateStaff(staff.id)
      toast({
        title: "Success",
        description: "Staff member deactivated successfully",
      })
      onDeactivate(staff.id)
      setOpen(false)
      router.refresh()
    } catch {
      toast({
        title: "Error",
        description: "Failed to deactivate staff member",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <ShieldMinus className="h-4 w-4 text-yellow-500" />
          <span className="sr-only">Deactivate staff member</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deactivate Staff Member</DialogTitle>
          <DialogDescription>
            Are you sure you want to deactivate {staff.name}? This action will
            prevent them from being scheduled for future shifts.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDeactivate}
            disabled={isLoading}
          >
            {isLoading ? "Deactivating..." : "Deactivate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
