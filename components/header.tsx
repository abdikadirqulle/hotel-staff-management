"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sidebar } from "./sidebar"

export function Header() {
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
  }

  return (
    <header className="border-b h-14 px-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <h1 className="text-lg font-semibold">Hotel Staff Management</h1>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
      {isSidebarOpen && <Sidebar />}
    </header>
  )
}
