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
   ```bash
   git clone https://github.com/rohitYadav03/coursehub-api
   cd course-enrollment-api
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

├── config/
│   └── db.js
├── middlewares/
│   └── userAuth.js
├── models/
│   ├── user.js
│   ├── course.js
│   └── enrollment.js
├── routes/
│   ├── auth.js
│   ├── profile.js
│   └── courses.js
├── index.js
├── package.json
├── .env
└── README.md

📬 API Endpoints
🔐 Auth Routes /auth
Method	Endpoint	Description
POST	/signup	    User registration
POST	/login	    User login
GET	    /logout	     Logout (clear cookie)

👤 Profile Routes /profile
Method	Endpoint	Description
GET	    /view	    View user profile
PATCH	/edit	    Edit user profile

📚 Course Routes /courses
Method	Endpoint	Description
POST	/	Create a new course (Instructor only)
GET	/	Get all courses
GET	/:id	Get course by ID
DELETE	/:id	Delete own course (Instructor only)

🎓 Enrollment Routes
Method	Endpoint	Description
POST	/enroll/:courseId	Enroll in a course (Student)
GET	/my-courses	Get student's enrolled courses

🔄 Sample API Flow to Test (Use Postman)
1. Register Users

POST /auth/signup
{
  "name": "Rohit",
  "email": "rohit@gmail.com",
  "password": "Rohit@1234",
  "role": "instructor"
}


POST /auth/signup
{
  "name": "Amit",
  "email": "amit@gmail.com",
  "password": "123456",
  "role": "student"
}
2. Login

POST /auth/login
{
  "email": "amit@gmail.com",
  "password": "123456"
}
3. Create Course (Instructor only)


POST /courses
{
  "title": "Mastering React.js",
  "description": "A complete frontend course using React.js and Redux.",
  "price": 999.99,
  "thumbnail": "https://example.com/images/react.jpg",
  "category": "Frontend"
}
4. View All Courses


GET /courses
5. Enroll in a Course (Student only)


POST /enroll/:courseId
6. View Enrolled Courses (Student only)


GET /my-courses
7. Delete a Course (Instructor only)



DELETE /courses/:id
✅ Status

All backend functionality has been tested with Postman and is working:
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
