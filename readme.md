# Task Manager API

A simple RESTful API for managing tasks with user authentication and authorization. Built with Node.js, Express, MongoDB, and JWT for token-based authentication.

## Features

- **User Authentication**:
  - Users can register and log in with secure password hashing and JWT token generation.
- **Task Management**:
  - Users can create, view, update, and delete tasks.
  - Each user can only access their own tasks, ensuring data privacy and security.
- **Profile Management**:
  - Users can view and update their profile information.
  - Users can delete their accounts if needed.
- **Error Handling**:
  - Handles validation and server errors with appropriate status codes and messages.

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)

## Prerequisites

- [Node.js](https://nodejs.org/) and npm installed
- [MongoDB](https://www.mongodb.com/) installed or a MongoDB cloud URI

## Getting Started

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/task-manager-api.git
   cd task-manager-api
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Set your environment variables as follows:

   For Bash:

   ```bash
   export DATABASE_URL="your_mongodb_uri"
   export JWT_SECRET="your_jwt_secret"
   export PORT=3000
   ```

   For PowerShell:

   ```powershell
   $env:DATABASE_URL="your_mongodb_uri"
   $env:JWT_SECRET="your_jwt_secret"
   $env:PORT=3000
   ```

4. **Run Server**
   ```bash
   npm start
   ```

## API Endpoints

### User Routes

- **POST /register**: Register a new user
- **POST /login**: Log in an existing user
- **GET /get-profile**: Get the profile of the logged-in user (requires authentication)
- **PATCH /update-profile**: Update the profile of the logged-in user (requires authentication)
- **DELETE /delete-account**: Delete the user account (requires authentication)

### Task Routes

- **GET /get-all-tasks**: Get all tasks for the logged-in user (requires authentication)
- **GET /get-task/:id**: Get a specific task by ID (requires authentication)
- **POST /create-task**: Create a new task (requires authentication)
- **PATCH /update-status/:id**: Update the status of a specific task (requires authentication)
- **PATCH /edit-task/:id**: Edit a specific task (requires authentication)
- **DELETE /delete-task/:id**: Delete a specific task (requires authentication)

## Conclusion

This API provides a simple yet effective way to manage tasks while ensuring user authentication and data protection.
