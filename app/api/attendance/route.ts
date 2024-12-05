import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const attendance = await db.attendance.findMany({
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

    return NextResponse.json(attendance)
  } catch (error) {
    console.error("Failed to fetch attendance:", error)
    return NextResponse.json(
      { error: "Failed to fetch attendance" },
      { status: 500 }
    )
  }
}
