"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EditStaffDialog } from "./edit-staff-dialog"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import type { Staff } from "@prisma/client"
import { DeleteStaffDialog } from "./delete-staff-dialog"

export function StaffList({ initialStaff }: { initialStaff: Staff[] }) {
  const [staff, setStaff] = useState(initialStaff)

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Hourly Rate</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staff?.map((member) => (
            <TableRow key={member.id}>
              <TableCell>{member.name}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>{member.role}</TableCell>
              <TableCell>{formatCurrency(member.hourlyRate)}</TableCell>
              <TableCell>
                <Badge
                  variant={member.status === "ACTIVE" ? "default" : "secondary"}
                >
                  {member.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <EditStaffDialog staff={member} onUpdate={handleUpdate} />
                <DeleteStaffDialog staff={member} onDelete={handleDelete} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )

  function handleUpdate(updatedStaff: Staff) {
    setStaff((prev) =>
      prev.map((s) => (s.id === updatedStaff.id ? updatedStaff : s))
    )
  }

  function handleDelete(deletedId: string) {
    setStaff((prev) => prev.filter((s) => s.id !== deletedId))
  }
}
