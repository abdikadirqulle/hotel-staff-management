"use server"

import { revalidatePath, unstable_cache } from "next/cache"
import { db } from "@/lib/db"
import { Prisma } from "@prisma/client"
import type { Staff } from "@prisma/client"

export async function createStaff(
  data: Omit<Staff, "id" | "status" | "createdAt" | "updatedAt">
) {
  const staff = await db.staff.create({
    data: {
      ...data,
      hourlyRate: new Prisma.Decimal(data.hourlyRate) || data.hourlyRate,
      status: "ACTIVE",
      activeShiftId: null,
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

export async function deactivateStaff(id: string) {
  try {
    const staff = await db.staff.findUnique({
      where: {
        id,
      },
    })
    const upadateStaff = await db.staff.update({
      where: { id: staff?.id },
      data: {
        status: staff?.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
      },
    })
    revalidatePath("/staff")
    return upadateStaff
  } catch (error) {
    console.log("eror deactive staff", error)
  }
}

export async function deleteStaff(id: string) {
  try {
    const staff = await db.staff.delete({
      where: {
        id,
      },
    })
    return staff
  } catch (error) {
    console.log({ "eror in delete staff": error })
  }
}
// export async function getStaff () {
export const getStaff = unstable_cache(async () => {
  try {
    const staff = await db.staff.findMany({
      orderBy: { createdAt: "desc" },
    })
    return staff
  } catch (error) {
    console.log({ "eror in getstaff": error })
  }
})
