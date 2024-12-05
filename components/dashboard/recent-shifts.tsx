"use client"

import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import type { Shift, Staff } from "@prisma/client"

type ShiftWithStaff = Shift & {
  staff: Pick<Staff, "name">
}

export function RecentShifts() {
  const [shifts, setShifts] = useState<ShiftWithStaff[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchRecentShifts() {
      try {
        const response = await fetch("/api/shifts/recent")
        const data = await response.json()
        setShifts(data)
      } catch (error) {
        console.error("Failed to fetch recent shifts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecentShifts()
  }, [])

  if (isLoading) {
    return <div>Loading recent shifts...</div>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Staff</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shifts?.map((shift) => (
            <TableRow key={shift.id}>
              <TableCell>
                {format(new Date(shift.date), "MMM d, yyyy")}
              </TableCell>
              <TableCell>{shift.staff.name}</TableCell>
              <TableCell>
                {format(new Date(shift.startTime), "h:mm a")} -{" "}
                {format(new Date(shift.endTime), "h:mm a")}
              </TableCell>
              <TableCell>{shift.location}</TableCell>
              <TableCell>
                <ShiftStatus date={shift.date} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function ShiftStatus({ date }: { date: Date }) {
  const now = new Date()
  const shiftDate = new Date(date)

  if (shiftDate > now) {
    return <Badge variant="outline">Upcoming</Badge>
  } else if (shiftDate.toDateString() === now.toDateString()) {
    return <Badge>Today</Badge>
  } else {
    return <Badge variant="secondary">Completed</Badge>
  }
}
