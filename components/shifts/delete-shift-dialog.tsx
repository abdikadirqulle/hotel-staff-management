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

import { useToast } from "@/hooks/use-toast"
import type { Shift } from "@prisma/client"
import { deleteShift } from "@/lib/actions/shifts"

interface DeleteShiftDialogProps {
  shift: Shift
  onDelete: (id: string) => void
}

export function DeleteShiftDialog({ shift, onDelete }: DeleteShiftDialogProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  async function handleDelete() {
    try {
      setIsLoading(true)
      await deleteShift(shift.id)
      toast({
        title: "Success",
        description: "Shift deleted successfully",
      })
      onDelete(shift.id)
      setOpen(false)
      router.refresh()
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete shift",
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
          <span className="sr-only">Delete shift</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Shift</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this shift? This action cannot be
            undone.
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
