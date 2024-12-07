import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format, isToday, isPast } from "date-fns"
import { db } from "@/lib/db"

export async function DashboardShifts() {
  const shifts = await getUpcomingShifts()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Shifts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shifts.map((shift) => (
                <TableRow key={shift.id}>
                  <TableCell>{shift.staff.name}</TableCell>
                  <TableCell>
                    {format(new Date(shift.date), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    {format(new Date(shift.startTime), "h:mm a")} -{" "}
                    {format(new Date(shift.endTime), "h:mm a")}
                  </TableCell>
                  <TableCell>{shift.location}</TableCell>
                  <TableCell>
                    <ShiftStatus date={new Date(shift.date)} />
                  </TableCell>
                </TableRow>
              ))}
              {shifts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No upcoming shifts
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

function ShiftStatus({ date }: { date: Date }) {
  if (isToday(date)) {
    return <Badge>Today</Badge>
  }
  if (isPast(date)) {
    return <Badge variant="secondary">Past</Badge>
  }
  return <Badge variant="outline">Upcoming</Badge>
}

async function getUpcomingShifts() {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return await db.shift.findMany({
      where: {
        date: {
          gte: today,
        },
      },
      include: {
        staff: {
          select: {
            name: true,
          },
        },
      },
      orderBy: [
        {
          date: "asc",
        },
        {
          startTime: "asc",
        },
      ],
      take: 5,
    })
  } catch (error) {
    console.error("Error fetching upcoming shifts:", error)
    return []
  }
}
