import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getDashboardData } from "@/lib/actions/dashboard"

export async function DashboardCards() {
  const { activeStaff, totalShifts, upcomingShifts, stats } =
    await getDashboardData()

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeStaff}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalShifts}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Upcoming Staff</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{upcomingShifts}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Average Hours/Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.averageHoursPerWeek}</div>
        </CardContent>
      </Card>
    </div>
  )
}
