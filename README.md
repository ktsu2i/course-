# Course Manager (in progress)

## Purpose of This Project
I am working on this project to solve the problems below for faculty and staff at Temple University, Japan Campus.

### Problems
- Professors must fill out a Google form which contains a lot of unnecessary inputs every time they request to offer a course in upcoming semester.
- Staff approve the offered courses and manually add them on Excel sheet.
- There is another Google form for professors to request to cancel a class due to sickness and so on. This also contains a lot of unnecessary inputs.

## Features
- User authentication with roles
  - Admin: has access to all the features
  - Coordinator: has access to managing users, add/update/delete courses, and requesting to cancel a class
  - Faculty: has access to add/update/delete courses and requesting to cancel a class
  - Staff: has access to reports
- User management
  - Add/Update/Delete users
  - Manage user roles
- Course management
  - Request to add courses
  - Update/Delete courses once they are approved or rejected by staff
  - Check the update records of each course
  - Filter courses by course name, semester, and year
- Class cancellation
  - Select a date to display user's courses on the day
  - Request to cancel a class
- Reports
  - Approve/Reject courses requested by professors
  - Check the update records of each course
  - Filter courses by course name, semester, and year

## Tech Stack
- TypeScript
- React
- Next.js
- Node.js
- Tailwind CSS
- MySQL
- shadcn/ui