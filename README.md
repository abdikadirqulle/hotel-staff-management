# Hotel Staff Management System

## Overview

The **Hotel Staff Management System** is a comprehensive solution designed to enhance the management of waiters' schedules, track work hours, calculate wages, and provide actionable insights into staff performance. This system ensures compliance with labor regulations, facilitates fair shift distribution, and improves overall staff utilization through real-time reporting and automation.

## Table of Contents

1. [Core Functionalities](#core-functionalities)
2. [API Endpoints](#api-endpoints)
3. [Database Schema](#database-schema)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Contributing](#contributing)
7. [License](#license)

## Core Functionalities

### 1. Staff Management

- Add, edit, and deactivate waiter profiles.
- Assign roles and set hourly/daily pay rates.

### 2. Shift Scheduling

- Create, update, and delete shifts with a visual calendar.
- Prevent scheduling conflicts and automate recurring shifts.

### 3. Attendance Tracking

- Enable staff to check in/out via a mobile app or web portal.
- Automatically calculate work hours, including overtime.

### 4. Real-Time Reporting

- Generate dashboards for shift coverage, attendance, and performance metrics.
- Export data for compliance audits or payroll processing.

### 5. Payroll Integration

- Calculate earnings based on logged hours and apply overtime rates.
- Generate detailed pay slips.

### 6. Shift Swap and Leave Requests

- Allow staff to request shift swaps or leaves, subject to admin approval.
- Notify relevant parties about updates or approvals.

## API Endpoints

### Staff Management

- `POST /api/staff`: Add a new staff member.
- `GET /api/staff/:id`: Fetch details of a specific staff member.
- `PUT /api/staff/:id`: Update staff details.
- `DELETE /api/staff/:id`: Deactivate a staff member.

### Shift Scheduling

- `POST /api/shifts`: Create a new shift.
- `GET /api/shifts`: Fetch all scheduled shifts.
- `PUT /api/shifts/:id`: Update an existing shift.
- `DELETE /api/shifts/:id`: Delete a shift.

### Attendance Tracking

- `POST /api/attendance/checkin`: Log staff check-in.
- `POST /api/attendance/checkout`: Log staff check-out.
- `GET /api/attendance`: Fetch attendance records.

### Reports

- `GET /api/reports/shifts`: Fetch shift coverage reports.
- `GET /api/reports/performance`: Generate performance metrics.

## Database Schema

### Staff Table

- `id`: Unique identifier.
- `name`: Name of the staff member.
- `role`: Job title (e.g., waiter).
- `hourly_rate`: Pay rate per hour.
- `status`: Active or inactive.

### Shifts Table

- `id`: Unique identifier.
- `date`: Date of the shift.
- `start_time`: Start time.
- `end_time`: End time.
- `location`: Assigned location (e.g., restaurant, bar).

### Attendance Table

- `id`: Unique identifier.
- `shift_id`: Associated shift.
- `staff_id`: Assigned staff member.
- `check_in_time`: Check-in timestamp.
- `check_out_time`: Check-out timestamp.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/abdikadirqulle/hotel-staff-management.git
   cd hotel-staff-management
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

Once the server is running, you can access the application at `http://localhost:3000`. Use the provided API endpoints to interact with the system.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
