"use server"

import { db } from "@/lib/db"

export async function getDashboardData() {
  try {
    const [activeStaff, totalShifts, upcomingShifts, monthlyStats, staffStats] =
      await Promise.all([
        getActiveStaffCount(),
        getTotalShiftsCount(),
        getUpcomingShiftsCount(),
        getMonthlyStats(),
        getStaffStats(),
      ])

    return {
      activeStaff: activeStaff ?? 0,
      totalShifts: totalShifts ?? 0,
      upcomingShifts: upcomingShifts ?? 0,
      stats: {
        monthlyStats: monthlyStats ?? new Array(12).fill(0),
        staffStats: staffStats ?? [],
        averageHoursPerWeek: calculateAverageHoursPerWeek(monthlyStats ?? []),
      },
    }
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    return {
      activeStaff: 0,
      totalShifts: 0,
      upcomingShifts: 0,
      stats: {
        monthlyStats: new Array(12).fill(0),
        staffStats: [],
        averageHoursPerWeek: 0,
      },
    }
  }
}

async function getActiveStaffCount() {
  try {
    return await db.staff.count({
      where: { status: "ACTIVE" },
    })
  } catch (error) {
    console.error("Error counting active staff:", error)
    return 0
  }
}

async function getTotalShiftsCount() {
  try {
    return await db.shift.count()
  } catch (error) {
    console.error("Error counting total shifts:", error)
    return 0
  }
}

async function getUpcomingShiftsCount() {
  try {
    return await db.shift.count({
      where: {
        date: { gte: new Date() },
      },
    })
  } catch (error) {
    console.error("Error counting upcoming shifts:", error)
    return 0
  }
}

async function getMonthlyStats() {
  try {
    const startDate = new Date()
    startDate.setMonth(startDate.getMonth() - 11)

    const shifts = await db.shift.findMany({
      where: {
        date: { gte: startDate },
      },
      select: {
        date: true,
        startTime: true,
        endTime: true,
      },
    })

    const monthlyStats = new Array(12).fill(0)
    shifts.forEach((shift) => {
      const monthIndex = shift.date.getMonth()
      const hours =
        (shift.endTime.getTime() - shift.startTime.getTime()) / (1000 * 60 * 60)
      monthlyStats[monthIndex] += hours
    })

    return monthlyStats
  } catch (error) {
    console.error("Error calculating monthly stats:", error)
    return new Array(12).fill(0)
  }
}

async function getStaffStats() {
  try {
    const staff = await db.staff.findMany({
      where: {
        status: "ACTIVE",
      },
      select: {
        name: true,
        _count: {
          select: {
            shifts: true,
          },
        },
      },
    })

    return staff.map((s) => ({
      name: s.name,
      shifts: s._count.shifts,
    }))
  } catch (error) {
    console.error("Error fetching staff stats:", error)
    return []
  }
}

function calculateAverageHoursPerWeek(monthlyStats: number[]) {
  if (!monthlyStats?.length) return 0
  const totalHours = monthlyStats.reduce((sum, hours) => sum + hours, 0)
  const averageHoursPerMonth = totalHours / monthlyStats.length
  return Math.round((averageHoursPerMonth * 12) / 52)
}
