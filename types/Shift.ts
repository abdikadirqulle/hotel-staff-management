export type Attendance = {
  id: string
  shiftId: string
  staffId: string
  status: string // e.g., "present", "absent", etc.
  timestamp: Date
}

export type Shift = {
  id: string
  date: Date
  startTime: Date
  endTime: Date
  location: string
  staffId: string
  attendance?: Attendance | null
  createdAt: Date
  updatedAt: Date
}
