import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop() || null
  if (!id) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
  const body = await request.json()
  try {
    const updatedShift = await db.shift.update({
      where: { id },
      data: {
        date: new Date(body.date),
        startTime: new Date(`${body.date}T${body.startTime}`),
        endTime: new Date(`${body.date}T${body.endTime}`),
        location: body.location,
      },
    })

    return NextResponse.json(updatedShift)
  } catch (error) {
    console.error("Failed to update shift:", error)
    return NextResponse.json(
      { error: "Failed to update shift" },
      { status: 500 }
    )
  }
}
export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop() || null

  if (!id) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  try {
    const deletedShift = await db.shift.delete({
      where: { id },
    })

    return NextResponse.json(deletedShift)
  } catch (error) {
    console.error("Failed to delete shift:", error)
    return NextResponse.json(
      { error: "Failed to delete shift" },
      { status: 500 }
    )
  }
}
