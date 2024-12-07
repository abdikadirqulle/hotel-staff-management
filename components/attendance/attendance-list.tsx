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
import type { Attendance, Shift, Staff } from "@prisma/client"
import { Skeleton } from "../ui/skeleton"

type AttendanceWithDetails = Attendance & {
  shift: Shift & {
    staff: Pick<Staff, "name">
  }
}

export function AttendanceList() {
  const [attendance, setAttendance] = useState<AttendanceWithDetails[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchAttendance() {
      try {
        const response = await fetch("/api/attendance")
        const data = await response.json()
        setAttendance(data)
      } catch (error) {
        console.error("Failed to fetch attendance:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAttendance()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-start flex-col space-y-4">
        <Skeleton className="h-6 w-[250px]" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-6 w-[50px]" />
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Staff</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Check In</TableHead>
            <TableHead>Check Out</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendance.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.shift.staff.name}</TableCell>
              <TableCell>
                {format(new Date(record.checkInTime), "MMM d, yyyy")}
              </TableCell>
              <TableCell>
                {format(new Date(record.checkInTime), "h:mm a")}
              </TableCell>
              <TableCell>
                {record.checkOutTime
                  ? format(new Date(record.checkOutTime), "h:mm a")
                  : "-"}
              </TableCell>
              <TableCell>
                {record.checkOutTime
                  ? getDuration(record.checkInTime, record.checkOutTime)
                  : "-"}
              </TableCell>
              <TableCell>
                <AttendanceStatus record={record} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function AttendanceStatus({ record }: { record: AttendanceWithDetails }) {
  if (!record.checkOutTime) {
    return <Badge>Active</Badge>
  }

  const checkIn = new Date(record.checkInTime)
  const shiftStart = new Date(record.shift.startTime)
  const isLate = checkIn > shiftStart

  return (
    <Badge variant={isLate ? "destructive" : "secondary"}>
      {isLate ? "Late" : "On Time"}
    </Badge>
  )
}

function getDuration(start: Date, end: Date) {
  const diff = new Date(end).getTime() - new Date(start).getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.round((diff % (1000 * 60 * 60)) / (1000 * 60))
  return `${hours}h ${minutes}m`
}
