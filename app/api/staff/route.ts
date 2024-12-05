import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const staff = await db.staff.findMany({
      select: {
        id: true,
        name: true,
        // Add other fields you need
      },
    })

    return NextResponse.json(staff)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch staff" },
      { status: 500 }
    )
  }
}
