"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogClose } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import {
  Banknote,
  BarChart,
  Calendar,
  ClipboardList,
  Folder,
  HomeIcon,
  Menu,
  Settings,
  Users,
} from "lucide-react"
import Link from "next/link"
import { ReactNode } from "react"
import { ThemeToggle } from "./theme-toggle"

export default function DashboardTopNav({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <header className="flex h-14 lg:h-[55px] items-center gap-4 border-b px-3">
        <Dialog>
          <SheetTrigger className="min-[1024px]:hidden p-2 transition">
            <Menu />
            <Link href="/dashboard">
              <span className="sr-only">Home</span>
            </Link>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <Link href="/">
                <SheetTitle>staff manager</SheetTitle>
              </Link>
            </SheetHeader>
            <div className="flex flex-col space-y-3 mt-[1rem]">
              <DialogClose asChild>
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full">
                    <HomeIcon className="mr-2 h-4 w-4" />
                    Home
                  </Button>
                </Link>
              </DialogClose>
              {/* staff */}
              <DialogClose asChild>
                <Link href="/staff">
                  <Button variant="outline" className="w-full">
                    <Users className="mr-2 h-4 w-4" />
                    Staff
                  </Button>
                </Link>
              </DialogClose>
              {/* shifts */}
              <DialogClose asChild>
                <Link href="/shifts">
                  <Button variant="outline" className="w-full">
                    <Calendar className="mr-2 h-4 w-4" />
                    Shifts
                  </Button>
                </Link>
              </DialogClose>
              {/* attendance */}
              <DialogClose asChild>
                <Link href="/attendance">
                  <Button variant="outline" className="w-full">
                    <ClipboardList className="mr-2 h-4 w-4" />
                    Attendance
                  </Button>
                </Link>
              </DialogClose>
              {/* reports */}
              <DialogClose asChild>
                <Link href="/reports">
                  <Button variant="outline" className="w-full">
                    <BarChart className="mr-2 h-4 w-4" />
                    Reports
                  </Button>
                </Link>
              </DialogClose>

              {/* settings */}
              <Separator className="my-3" />
              <DialogClose asChild>
                <Link href="/settings">
                  <Button variant="outline" className="w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </Link>
              </DialogClose>
            </div>
          </SheetContent>
        </Dialog>
        <div className="flex justify-center items-center gap-2 ml-auto">
          {/* {config?.auth?.enabled && <UserProfile />} */}
          <ThemeToggle />
        </div>
      </header>
      {children}
    </div>
  )
}
