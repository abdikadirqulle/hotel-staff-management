import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Fetch the 10 most recent shifts with staff information
    const recentShifts = await db.shift.findMany({
      take: 10,
      orderBy: {
        date: "desc",
      },
      include: {
        staff: {
          select: {
            name: true,
          },
        },
      },
    })

    return NextResponse.json(recentShifts)
  } catch (error) {
    console.error("Failed to fetch recent shifts:", error)
    return NextResponse.json(
      { error: "Failed to fetch recent shifts" },
      { status: 500 }
    )
  }
}
