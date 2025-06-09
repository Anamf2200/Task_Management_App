# Task Management App

A full-stack Task Management application with authentication, authorization, role-based access control, and CRUD operations for users and tasks.

## Technologies Used

- **Backend:** NestJS (TypeScript), PostgreSQL, TypeORM, JWT authentication
- **Frontend:** React, Redux Toolkit Query
- **Database:** PostgreSQL

## Features

- User authentication with JWT tokens
- Role-based authorization with `admin` and `user` roles
- CRUD operations for **Users** (admin only)
- CRUD operations for **Tasks**
  - **Users** can **view** tasks
  - **Admins** can create, update, delete tasks and manage users
- Password hashing with bcrypt
- Secure REST API protected with JWT and Guards

## Architecture Overview

- **Backend (NestJS):**
  - `AuthModule`: Handles user login and JWT token generation
  - `UsersModule`: CRUD for users with role-based access
  - `TasksModule`: CRUD for tasks with role-based restrictions
  - Guards and decorators enforce roles and permissions
  - PostgreSQL stores user and task data via TypeORM

- **Frontend (React):**
  - Uses Redux Toolkit Query to interact with backend API
  - Stores JWT token in localStorage and sends it via Authorization header
  - Separate views and buttons for users vs admins based on role


