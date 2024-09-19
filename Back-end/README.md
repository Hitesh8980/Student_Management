# Student Management System Backend

This is the backend for the Student Management System, built using Node.js and integrated with Firebase for database management. It provides endpoints for managing student data, including adding, updating, filtering, and QR code generation.

# Features

Manage Student Information:

Add, update, and delete student records using Firebase as the data store.

# Excel Upload:

Handle bulk student data uploads using Excel files, where each student’s admission number is used as a unique identifier.
Filter Functionality:

# API routes to filter student data based on various criteria like name, admission number, or class.

# QR Code Generation:

Endpoints to generate QR codes for student admission numbers, which can be scanned to retrieve student details.

# Tech Stack

Backend: Node.js with Express.js

Database: Firebase Firestore

# Other Technologies:

QR code generation libraries

Excel file parsing for bulk uploads

# Setup Instructions

Clone the Repository:

bash
Copy code

git clone https://github.com/Hitesh8980/Student_Management.git

cd Back-end

# Install Dependencies:

bash

Copy code

npm install

# Firebase Setup:

Create a Firebase project and set up Firestore.

Add your Firebase config to a .env file in the root directory:

makefile

Copy code

FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=your-auth-domain
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-storage-bucket
FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
FIREBASE_APP_ID=your-app-id
Run the Server:

bash
Copy code

npm start

The server will run on http://localhost:5000.

# API Endpoints

1. Add Student
POST /api/students
Request body:
json
Copy code
{
  "name": "John Doe",
  "admissionNumber": "12345",
  "class": "10",
  "age": 16
}
Adds a new student to the database.

2. Update Student
PUT /api/students/:admissionNumber
Request body: (fields to be updated)
json
Copy code
{
  "name": "Jane Doe",
  "class": "12"
}
Updates student data for the given admission number.

3. Delete Student
DELETE /api/students/:admissionNumber
Deletes the student record for the given admission number.

4. Filter Students
GET /api/students?name=John&class=10
Retrieves students matching the filter criteria (e.g., name, class, etc.).

5. Upload Students via Excel
POST /api/students/upload
Accepts an Excel file with student data and adds students in bulk.

6. Generate QR Code
GET /api/students/:admissionNumber/qrcode
Generates a QR code for the given admission number.
Firebase Database Structure
Collection: students
Each document is a student's record, where the document ID is the student's admissionNumber.
Example document:
json
Copy code
{
  "name": "John Doe",
  "class": "10",
  "age": 16,
  "admissionNumber": "12345"
}

# Contributing
Fork the repository.

Create a new feature branch (git checkout -b feature/your-feature).

Commit your changes (git commit -m 'Add new feature').

Push to the branch (git push origin feature/your-feature).

Create a new Pull Request.
