# Project Overview

You are building a **Hotel Staff Management System** designed to streamline the management of waiters' schedules, track work hours, calculate wages, and provide actionable insights into staff performance. The system ensures compliance with labor regulations, facilitates fair shift distribution, and improves overall staff utilization through real-time reporting and automation.

You will be using nextjs 15, shadcn UI, tailwind css, lucid icon

# Core Functionalities

1. **Staff Management**

   - Add, edit, and deactivate waiter profiles.
   - Assign roles and set hourly/daily pay rates.

2. **Shift Scheduling**

   - Create, update, and delete shifts with a visual calendar.
   - Prevent scheduling conflicts and automate recurring shifts.

3. **Attendance Tracking**

   - Enable staff to check in/out via a mobile app or web portal.
   - Automatically calculate work hours, including overtime.

4. **Real-Time Reporting**

   - Generate dashboards for shift coverage, attendance, and performance metrics.
   - Export data for compliance audits or payroll processing.

5. **Payroll Integration**

   - Calculate earnings based on logged hours and apply overtime rates.
   - Generate detailed pay slips.

6. **Shift Swap and Leave Requests**
   - Allow staff to request shift swaps or leaves, subject to admin approval.
   - Notify relevant parties about updates or approvals.

---

# Documentation

#### **API Endpoints**

1. **Staff Management**

   - `POST /api/staff`: Add a new staff member.
   - `GET /api/staff/:id`: Fetch details of a specific staff member.
   - `PUT /api/staff/:id`: Update staff details.
   - `DELETE /api/staff/:id`: Deactivate a staff member.

2. **Shift Scheduling**

   - `POST /api/shifts`: Create a new shift.
   - `GET /api/shifts`: Fetch all scheduled shifts.
   - `PUT /api/shifts/:id`: Update an existing shift.
   - `DELETE /api/shifts/:id`: Delete a shift.

3. **Attendance Tracking**

   - `POST /api/attendance/checkin`: Log staff check-in.
   - `POST /api/attendance/checkout`: Log staff check-out.
   - `GET /api/attendance`: Fetch attendance records.

4. **Reports**
   - `GET /api/reports/shifts`: Fetch shift coverage reports.
   - `GET /api/reports/performance`: Generate performance metrics.

---

#### **Database Schema**

1. **Staff Table**

   - `id`: Unique identifier.
   - `name`: Name of the staff member.
   - `role`: Job title (e.g., waiter).
   - `hourly_rate`: Pay rate per hour.
   - `status`: Active or inactive.

2. **Shifts Table**

   - `id`: Unique identifier.
   - `date`: Date of the shift.
   - `start_time`: Start time.
   - `end_time`: End time.
   - `location`: Assigned location (e.g., restaurant, bar).

3. **Attendance Table**
   - `id`: Unique identifier.
   - `shift_id`: Associated shift.
   - `staff_id`: Assigned staff member.
   - `check_in_time`: Check-in timestamp.
   - `check_out_time`: Check-out timestamp.

---

# Current File Structures

xxxx
