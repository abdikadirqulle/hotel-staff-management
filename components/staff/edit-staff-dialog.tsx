"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Pencil } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { updateStaff } from "@/lib/actions/staff"
import { useToast } from "@/hooks/use-toast"
import type { Staff } from "@prisma/client"
import Decimal from "decimal.js"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.string().min(1, "Role is required"),
  hourlyRate: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid hourly rate"),
})

interface EditStaffDialogProps {
  staff: Staff
  onUpdate: (staff: Staff) => void
}

export function EditStaffDialog({ staff, onUpdate }: EditStaffDialogProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: staff.name,
      email: staff.email,
      role: staff.role,
      hourlyRate: staff.hourlyRate.toString(),
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const updatedStaff = await updateStaff(staff.id, {
        ...values,
        hourlyRate: new Decimal(parseFloat(values.hourlyRate)),
      })
      toast({
        title: "Success",
        description: "Staff member updated successfully",
      })
      onUpdate(updatedStaff)
      setOpen(false)
      router.refresh()
    } catch {
      toast({
        title: "Error",
        description: "Failed to update staff member",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit staff member</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Staff Member</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="WAITER">Waiter</SelectItem>
                      <SelectItem value="HEAD_WAITER">Head Waiter</SelectItem>
                      <SelectItem value="TRAINEE">Trainee</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hourlyRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hourly Rate</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Update Staff Member
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
