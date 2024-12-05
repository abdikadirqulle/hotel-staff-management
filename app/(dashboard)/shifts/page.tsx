import { Suspense } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ShiftCalendar } from "@/components/shifts/shift-calendar"
import { CreateShiftDialog } from "@/components/shifts/create-shift-dialog"

export default function ShiftsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Shift Schedule</h2>
          <p className="text-muted-foreground">
            Manage and view staff shift schedules
          </p>
        </div>
        <CreateShiftDialog>
          <Button>
            <Plus className="h-4 w-4" />
            Add Shift
          </Button>
        </CreateShiftDialog>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ShiftCalendar />
      </Suspense>
    </div>
  )
}
