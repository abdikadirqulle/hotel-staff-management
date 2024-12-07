import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/dashboard/overview"
import { StaffStats } from "@/components/dashboard/staff-stats"
import { getDashboardData } from "@/lib/actions/dashboard"

export async function DashboardCharts() {
  const { stats } = await getDashboardData()

  return (
    <>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Monthly Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Overview data={stats.monthlyStats ?? []} />
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Staff Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <StaffStats data={stats.staffStats ?? []} />
        </CardContent>
      </Card>
    </>
  )
}
