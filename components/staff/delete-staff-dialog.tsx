"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
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
import { deleteStaff } from "@/lib/actions/staff"
import { useToast } from "@/hooks/use-toast"
import type { Staff } from "@prisma/client"

interface DeleteStaffDialogProps {
  staff: Staff
  onDelete: (id: string) => void
}

export function DeleteStaffDialog({ staff, onDelete }: DeleteStaffDialogProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  async function handleDelete() {
    try {
      setIsLoading(true)
      await deleteStaff(staff.id)
      toast({
        title: "Success",
        description: "Staff member Deleted successfully",
      })
      onDelete(staff.id)
      setOpen(false)
      router.refresh()
    } catch {
      toast({
        title: "Error",
        description: "Failed to Delete staff member",
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
          <Trash2 className="h-4 w-4 text-destructive" />
          <span className="sr-only">Delete staff member</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Staff Member</DialogTitle>
          <DialogDescription>
            Are you sure you want to Delete {staff.name}? This action will
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
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
