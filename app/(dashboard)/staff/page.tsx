import { Suspense } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StaffList } from "@/components/staff/staff-list"
import { CreateStaffDialog } from "@/components/staff/create-staff-dialog"
import { getStaff } from "@/lib/actions/staff"

export default async function StaffPage() {
  const staff = await getStaff()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Staff Management
          </h2>
          <p className="text-muted-foreground">
            Manage your staff members and their roles
          </p>
        </div>
        <CreateStaffDialog>
          <Button>
            <Plus className="h-4 w-4" />
            Add Staff
          </Button>
        </CreateStaffDialog>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <StaffList initialStaff={staff} />
      </Suspense>
    </div>
  )
}
