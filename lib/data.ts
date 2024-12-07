import { db } from "./db"

export async function getStaffMetrics() {
  const activeStaff = await db.staff.count({
    where: { status: "ACTIVE" },
  })

  const totalStaff = await db.staff.count()

  const upcomingShifts = await db.shift.count({
    where: {
      date: {
        gte: new Date(),
      },
    },
  })

  //   const averageHours = await db.shift.aggregate({
  //     _avg: {
  //       _count: {
  //         select: {
  //           staffId: true,
  //         },
  //       },
  //     },
  //   })

  return {
    activeStaff,
    totalStaff,
    upcomingShifts,
    // averageHours: Math.round(averageHours._avg._count?.staffId || 0),
  }
}

export async function getUpcomingShifts() {
  return db.shift.findMany({
    where: {
      date: {
        gte: new Date(),
      },
    },
    include: {
      staff: true,
    },
    orderBy: {
      date: "asc",
    },
    take: 5,
  })
}

export async function getMonthlyOverview() {
  const currentYear = new Date().getFullYear()
  const shifts = await db.shift.groupBy({
    by: ["date"],
    where: {
      date: {
        gte: new Date(currentYear, 0, 1),
        lt: new Date(currentYear + 1, 0, 1),
      },
    },
    _count: true,
  })

  return shifts
}
