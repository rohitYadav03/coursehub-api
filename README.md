
# 🎓 Course Enrollment Backend API

This is a fully functional backend REST API for a course enrollment platform, built using **Node.js**, **Express**, **MongoDB**, and **JWT Authentication**.

It supports two types of users: **Students** and **Instructors**.

---

## 💻 Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- HTTP-only Cookies
- Bcrypt (Password hashing)

---

## 🚀 Features

- ✅ Signup & Login with JWT (stored in cookies)
- ✅ Role-based access (Student / Instructor)
- ✅ View and Edit profile
- ✅ Instructors can create and delete their courses
- ✅ Public course listing
- ✅ Students can enroll in courses
- ✅ Students can view enrolled courses

---

## 📦 Installation & Setup

1. **Clone the repository**

git clone https://github.com/rohitYadav03/coursehub-api
cd  coursehub-api

Install dependencies

npm install
Create a .env file

MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Run the server

node index.js
The server will run at: http://localhost:3000

🔐 Environment Variables
Variable	Description
MONGO_URL	MongoDB connection URI
JWT_SECRET	Secret key for JWT token

📁 Folder Structure

├── config

│   └── db.js

├── middlewares

│   └── userAuth.js


├── models

│   ├── user.js

│   ├── course.js

│   └── enrollment.js


├── routes

│   ├── auth.js

│   ├── profile.js

│   └── courses.js


├── index.js

├── package.json

├── .env

└── README.md




All backend functionality has been tested with Postman and is
 working:

Auth ✅

Profile ✅

Course Create/Delete ✅

View Courses ✅

Enroll ✅

My Courses ✅


🧠 Future Ideas

Add course reviews & ratings

Add pagination and filters

Add admin panel


✍️ Author

Built by Rohit Yadav

GitHub: https://github.com/rohitYadav03

