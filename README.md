✅ Goal of the Project
Build a basic course selling platform with:
Login/register
Role-based access (student and instructor)
Course creation and enrollment
No payments, no Stripe — just practicing backend logic

🔑 1. SCHEMAS YOU NEED (with simple explanation)
👤 User Schema
Field	What it stores
name	User’s name
email	Unique email
password	Hashed password
role	'student' or 'instructor'

Used to login, register, and determine access.
No course-related logic here — it's only for identity and role.

📘 Course Schema
Field	What it stores
title, description	Course info
price	Course price
thumbnail	Image URL (optional)
category	Like "coding", "design", etc.
instructor	Which user created it (User ID)
lessons	Array of { title, content }
createdAt	Timestamp

Instructor creates courses. Students can browse and enroll in them.

🛒 Enrollment Schema (like purchase)
Field	What it stores
userId	Student who enrolled
courseId	The course enrolled in
pricePaid	Price of course at purchase
status	'completed' (default)
purchasedAt	Date/time of enrollment

When a student “buys” (enrolls) in a course, this document is created.

🌐 2. API ROUTES — What Each One Does
🔐 AUTH ROUTES
Method	Route	        What it does
POST	/auth/register	 Register user (send name, email, password, role)
POST	/auth/login	     Login user → returns JWT
GET	/auth/profile	     Get current user info (JWT protected)

📘 COURSE ROUTES
Method	Route	Who can access	          What it does
GET	/courses	    Public	              List all courses
GET	/courses/:id	Public	              View one course in detail
POST	/courses	Instructor            only Create a new course
PATCH	/courses/:id	Instructor (owner only)	Update your own course
DELETE	/courses/:id	Instructor (owner only)	Delete your own course
POST	/courses/:id/lessons	Instructor (owner only)	Add lessons to a course

🛒 ENROLLMENT ROUTES
Method	Route	Who can access	What it does
POST	/enrollments	Student only	Enroll in a course → pass courseId in body
GET	/enrollments/my	Student only	List all enrolled courses for that student
GET	/courses/:id/students	Instructor (owner only)	View which students enrolled in your course

🧱 3. MIDDLEWARES TO WRITE
Middleware	What it does
auth	Verifies JWT token and sets req.user
requireRole('student')	Only allows access if role matches
ownsCourse	Checks if logged-in user owns the course (for edit/delete)

🎯 4. LEARNING YOU'LL GET
How to build protected routes with roles
How to model a real-world app with related collections
How to use MongoDB population (populate) to link data
How to think like a backend engineer (modular design, access control, etc.)

🟩 FINAL THOUGHTS
This is a perfect intermediate project:
You won't touch Stripe or UIs.
You’ll focus only on solid, real-world backend logic.
You'll learn more than basics but won’t burn out.
Let me know when you want to begin — I can help you:
Design the route folders and files
Plan your controller logic
Or test your APIs one-by-one
You're doing exactly the right thing 👏









