import { Suspense } from "react"
import { DashboardCards } from "@/components/dashboard/dashboard-cards"
import { DashboardShifts } from "@/components/dashboard/dashboard-shifts"
import { DashboardCharts } from "@/components/dashboard/dashboard-charts"
import { CardSkeleton } from "@/components/skeletons"

export default async function DashboardPage() {
  return (
    <div className="space-y-4">
      <Suspense fallback={<CardSkeleton />}>
        <DashboardCards />
      </Suspense>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Suspense fallback={<CardSkeleton className="col-span-4" />}>
          <DashboardCharts />
        </Suspense>
      </div>
      <Suspense fallback={<CardSkeleton />}>
        <DashboardShifts />
      </Suspense>
    </div>
  )
}
