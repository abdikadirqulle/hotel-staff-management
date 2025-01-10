"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { useQuery } from "@tanstack/react-query"
import type { Shift, Staff } from "@prisma/client"
import { UpdateShiftDialog } from "./update-shift-dialog"
import { DeleteShiftDialog } from "./delete-shift-dialog"

type ShiftWithStaff = Shift & {
  staff: Pick<Staff, "name">
}

export function ShiftCalendar() {
  const [date, setDate] = useState<Date>(new Date())
  const [shifts, setShifts] = useState<ShiftWithStaff[]>([])

  const { data: fetchedShifts = [], isLoading } = useQuery<ShiftWithStaff[]>({
    queryKey: ["shifts", format(date, "yyyy-MM")],
    queryFn: async () => {
      const response = await fetch(
        `/api/shifts?month=${format(date, "yyyy-MM")}`
      )
      if (!response.ok) throw new Error("Failed to fetch shifts")
      return response.json()
    },
  })

  console.log("fetchedShifts : ", fetchedShifts)

  useEffect(() => {
    setShifts(fetchedShifts)
  }, [fetchedShifts])

  const selectedDayShifts = shifts.filter(
    (shift) =>
      format(new Date(shift.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
  )

  function handleDeleteShift(deletedShiftId: string) {
    setShifts((prev) => prev.filter((shift) => shift.id !== deletedShiftId))
  }
  function handleUpdateShift(updatedShift: Shift) {
    setShifts((prev) =>
      prev.map((shift) =>
        shift.id === updatedShift.id ? { ...shift, ...updatedShift } : shift
      )
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-[300px_1fr]">
      <Card>
        <CardContent className="p-3">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => date && setDate(date)}
            className="rounded-md border"
            components={{
              DayContent: (props) => {
                const dayShifts = shifts.filter(
                  (shift) =>
                    format(new Date(shift.date), "yyyy-MM-dd") ===
                    format(props.date, "yyyy-MM-dd")
                )
                return (
                  <div className="relative">
                    <div>{props.date.getDate()}</div>
                    {dayShifts.length > 0 && (
                      <Badge
                        variant="secondary"
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 scale-75"
                      >
                        {dayShifts.length}
                      </Badge>
                    )}
                  </div>
                )
              },
            }}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{format(date, "MMMM d, yyyy")}</CardTitle>
          <CardDescription>
            {selectedDayShifts.length} shifts scheduled
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loading shifts...</div>
          ) : (
            <div className="space-y-4">
              {selectedDayShifts.map((shift) => (
                <ShiftCard
                  key={shift.id}
                  shift={shift}
                  onDelete={handleDeleteShift}
                  onUpdate={handleUpdateShift}
                />
              ))}
              {selectedDayShifts.length === 0 && (
                <p className="text-muted-foreground">
                  No shifts scheduled for this day
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// shift card component
function ShiftCard({
  shift,
  onDelete,
  onUpdate,
}: {
  shift: ShiftWithStaff
  onDelete: (id: string) => void
  onUpdate: (shift: Shift) => void
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="font-medium">{shift.staff.name}</p>
              <Badge>{shift.location}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {format(new Date(shift.startTime), "h:mm a")} -{" "}
              {format(new Date(shift.endTime), "h:mm a")}
            </p>
          </div>
          <div className="space-x-2">
            <UpdateShiftDialog shift={shift} onUpdate={onUpdate} />
            <DeleteShiftDialog shift={shift} onDelete={onDelete} />
          </div>
        </div>
      </CardContent>
    </Card>
  )

  function handleUpdateShift(updatedShift: Shift) {
    // Logic to update the shift in the state
  }
}
