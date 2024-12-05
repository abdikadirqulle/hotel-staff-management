import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import { startOfMonth, endOfMonth } from "date-fns"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const monthParam = searchParams.get("month")

    if (!monthParam) {
      return NextResponse.json(
        { error: "Month parameter is required" },
        { status: 400 }
      )
    }

    const date = new Date(monthParam)
    const shifts = await db.shift.findMany({
      where: {
        date: {
          gte: startOfMonth(date),
          lte: endOfMonth(date),
        },
      },
      include: {
        staff: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        date: "asc",
      },
    })

    return NextResponse.json(shifts)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch shifts" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const shift = await db.shift.create({
      data: {
        staffId: body.staffId,
        date: new Date(body.date),
        startTime: new Date(`${body.date}T${body.startTime}`),
        endTime: new Date(`${body.date}T${body.endTime}`),
        location: body.location,
      },
    })

    return NextResponse.json(shift)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create shift" },
      { status: 500 }
    )
  }
}
