import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import DashboardSideBar from "@/components/dashboard-sidebar"
import DashboardTopNav from "@/components/dashbord-top-nav"

const queryClient = new QueryClient()

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen flex">
      <DashboardSideBar />
      <div className="flex-1 flex flex-col">
        <DashboardTopNav>
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </DashboardTopNav>
      </div>
    </div>
  )
}
