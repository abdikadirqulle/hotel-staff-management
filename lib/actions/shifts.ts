"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { Shift } from "@prisma/client"
import { format } from "date-fns"

export async function updateShift(id: string, data: Partial<Shift>) {
  console.log("id, data : ", id, data)

  try {
    const formattedDate = format(data.date, "yyyy-MM-dd")
    console.log("formattedDate : ", formattedDate)
    const updatedShift = await db.shift.update({
      where: { id },
      data: {
        date: new Date(formattedDate),
        startTime: data.startTime,
        endTime: data.endTime,
        location: data.location,
      },
    })
    console.log("updatedShift : ", updatedShift)
    revalidatePath("/shifts")
    return updatedShift
  } catch (error) {
    console.error("Failed to update shift:", error)
    // throw new Error("Failed to update shift")
  }
}

export async function deleteShift(id: string) {
  try {
    const deletedShift = await db.shift.delete({
      where: { id },
    })
    revalidatePath("/shifts")
    return deletedShift
  } catch (error) {
    console.error("Failed to delete shift:", error)
    throw new Error("Failed to delete shift")
  }
}
