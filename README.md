# Course Manager (in progress)

## Purpose of This Project

I am working on this project to solve the problems below for faculty and staff at Temple University, Japan Campus.

### Problems

- Professors must fill out a Google form which contains a lot of unnecessary inputs every time they request to offer a course in upcoming semester.
- Staff approve the requested courses and manually add them on Excel sheets.
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

## Challenges while developing the app

- Find the best solution for user authentication
  - I needed to manage the user table in local, so professors involved in this project suggested me to search open-source IAM and consider pros and cons to decide what we use.
  - Eventually, those who will work on projects for TUJ in the future can also access the user table and easily implement user authentication systems.
  - I implemented a user authentication system with Clerk at first, but we decided to use Keycloak with Docker.
  - However, since Keycloak has less information on the internet and it has some difficulties to implement, I decided to use Supabase instead.

## Tech Stack

- TypeScript
- React
- Next.js
- Node.js
- Ruby
- Ruby on Rails
- Tailwind CSS
- PostgreSQL
- MySQL
- shadcn/ui
- Supabase (Self-host)
- Docker

# For Developers

## How to Run

Run this command to run docker

```
docker-compose up
```
