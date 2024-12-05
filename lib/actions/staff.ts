"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { Prisma } from "@prisma/client"
import type { Staff } from "@prisma/client"

export async function createStaff(
  data: Omit<Staff, "id" | "status" | "createdAt" | "updatedAt">
) {
  const staff = await db.staff.create({
    data: {
      ...data,
      hourlyRate: new Prisma.Decimal(data.hourlyRate),
      status: "ACTIVE",
    },
  })
  revalidatePath("/staff")
  return staff
}

export async function updateStaff(id: string, data: Partial<Staff>) {
  const staff = await db.staff.update({
    where: { id },
    data: {
      ...data,
      hourlyRate: data.hourlyRate
        ? new Prisma.Decimal(data.hourlyRate)
        : undefined,
    },
  })
  revalidatePath("/staff")
  return staff
}

export async function deleteStaff(id: string) {
  const staff = await db.staff.update({
    where: { id },
    data: {
      status: "INACTIVE",
    },
  })
  revalidatePath("/staff")
  return staff
}

export async function getStaff() {
  try {
    const staff = await db.staff.findMany({
      orderBy: { createdAt: "desc" },
    })
    return staff
  } catch (error) {
    console.log({ "eror in getstaff": error })
  }
}
