"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Calendar, ClipboardList, Home, Users, BarChart } from "lucide-react"

const routes = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/",
  },
  {
    label: "Staff",
    icon: Users,
    href: "/staff",
  },
  {
    label: "Shifts",
    icon: Calendar,
    href: "/shifts",
  },
  {
    label: "Attendance",
    icon: ClipboardList,
    href: "/attendance",
  },
  {
    label: "Reports",
    icon: BarChart,
    href: "/reports",
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-[240px] flex-col border-r bg-background">
      <div className="p-6">
        <h2 className="text-lg font-semibold">Staff Manager</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="grid gap-1 px-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === route.href ? "bg-accent" : "transparent"
              )}
            >
              <route.icon className="h-4 w-4" />
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
