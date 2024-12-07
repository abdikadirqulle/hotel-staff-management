import { Suspense } from "react"
import { format } from "date-fns"
import { Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AttendanceList } from "@/components/attendance/attendance-list"
import { CheckInOutButton } from "@/components/attendance/check-in-out-button"
import { getActiveShift } from "@/lib/actions/attendance"
import DashboardLoading from "../loading"

export default async function AttendancePage() {
  const activeShift = await getActiveShift()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Attendance</h2>
          <p className="text-muted-foreground">
            Track staff check-ins and check-outs
          </p>
        </div>
        {activeShift && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Shift
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {format(new Date(activeShift.startTime), "h:mm a")}
              </div>
              <p className="text-xs text-muted-foreground">
                Started {format(new Date(activeShift.startTime), "MMM d, yyyy")}
              </p>
            </CardContent>
          </Card>
        )}
        <CheckInOutButton />
      </div>
      <Suspense fallback={<DashboardLoading />}>
        <AttendanceList />
      </Suspense>
    </div>
  )
}
