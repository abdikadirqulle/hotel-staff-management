"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { endOfDay, startOfDay } from "date-fns"

export async function getActiveShift() {
  try {
    const now = new Date()
    return await db.shift.findFirst({
      where: {
        date: {
          equals: startOfDay(now),
        },
        startTime: {
          lte: now,
        },
        endTime: {
          gte: now,
        },
      },
      include: {
        staff: {
          select: {
            name: true,
          },
        },
        attendance: true,
      },
    })
  } catch (error) {
    console.error("Error fetching active shift:", error)
    return null
  }
}

export async function checkIn(shiftId: string) {
  try {
    const shift = await db.shift.findUnique({
      where: { id: shiftId },
      select: { staffId: true },
    })

    if (!shift) {
      throw new Error("Shift not found")
    }

    const attendance = await db.attendance.create({
      data: {
        shiftId,
        staffId: shift.staffId,
        checkInTime: new Date(),
      },
    })
    revalidatePath("/attendance")
    return attendance
  } catch (error) {
    console.error("Error checking in:", error)
    return null
  }
}

export async function checkOut(attendanceId: string) {
  try {
    const attendance = await db.attendance.update({
      where: { id: attendanceId },
      data: {
        checkOutTime: new Date(),
      },
    })
    revalidatePath("/attendance")
    return attendance
  } catch (error) {
    console.error("Error checking out:", error)
    // throw new Error("Failed to check out")
  }
}

export async function getAttendanceList() {
  try {
    return await db.attendance.findMany({
      include: {
        shift: {
          include: {
            staff: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        checkInTime: "desc",
      },
      take: 50,
    })
  } catch (error) {
    console.error("Error fetching attendance list:", error)
    return []
  }
}
