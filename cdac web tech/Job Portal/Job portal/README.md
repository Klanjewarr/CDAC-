# Job Portal & Application Management System
**Full Stack Development Project**  
*React.js • TypeScript • Tailwind CSS • Node.js • Express.js • MongoDB Atlas • JWT*

---

## 1. Project Overview
A complete, production-ready Full Stack Job Portal platform connecting Job Seekers with Employers, moderated by an Administrator.
- **Job Seekers**: Search and filter vacancies, upload resumes (PDF/DOC), apply for positions, and track live hiring application status.
- **Employers**: Manage company profiles, publish job openings with required skills/salaries/deadlines, download applicant resumes, and update application status (`Shortlisted`, `Selected`, `Rejected`).
- **Administrators**: Moderate platform vacancies and users, view live statistics calculated via MongoDB Aggregation Pipelines.

---

## 2. Technology Stack
| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Tailwind CSS, Lucide React, Axios, React Router Dom |
| **Backend** | Node.js, Express.js (TypeScript), Multer, Helmet, CORS |
| **Database** | MongoDB Atlas (Cloud) / Local MongoDB via Mongoose ODM |
| **Security** | JWT (JSON Web Tokens) with Access & Refresh flow, Bcrypt.js password hashing, RBAC Middleware |

---

## 3. Quick Start & Execution Guide

### Step 1: Clone & Configure Backend
```bash
cd "Job portal/server"
npm install
```

Make sure your `server/.env` contains your MongoDB Atlas connection:
```env
PORT=5000
NODE_ENV=development
MONGODB_URL=mongodb+srv://<user>:<password>@cluster0.h4uj6e6.mongodb.net/job_portal_db?retryWrites=true&w=majority
JWT_SECRET=super_secret_jwt_access_key
JWT_REFRESH_SECRET=super_secret_jwt_refresh_key
CLIENT_URL=http://localhost:5173
```

### Step 2: Seed the Database with Demo Data
Run the automatic database seeder to populate sample users, companies, categories, jobs, and applications:
```bash
npm run seed
```

### Step 3: Start the Backend Server
```bash
npm run dev
```
Backend runs on: `http://localhost:5000`

### Step 4: Start the Frontend Client
In a new terminal window:
```bash
cd "Job portal/client"
npm install
npm run dev
```
Frontend runs on: `http://localhost:5173`

---

## 4. Evaluation Demo Credentials
Use these pre-seeded accounts to demonstrate all 3 roles:

| Role | Email | Password | What to Demo |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@jobportal.com` | `Password123` | Aggregation statistics, user activation/deactivation, job reviews |
| **Employer** | `employer@techcorp.com` | `Password123` | Post new vacancy, view candidates, download resume, change status |
| **Job Seeker** | `rahul.seeker@gmail.com` | `Password123` | Search/filter jobs, upload PDF resume, track application status |

*(Tip: On the `/login` screen, click the quick 1-click demo buttons to instantly fill credentials).*

---

## 5. REST API Documentation

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Register a new user (`name`, `email`, `password`, `role: 'jobseeker' | 'employer'`).
- `POST /api/auth/login` - Authenticate user, return user object + JWT access and refresh tokens.
- `POST /api/auth/refresh` - Issue new access token using valid refresh token.
- `GET /api/users/profile` - Protected: Get current logged-in user profile.
- `PUT /api/users/profile` - Protected: Update personal details.

### Companies (`/api/companies`)
- `POST /api/companies` - Employer: Register company profile (`name`, `description`, `location`, `website`, `logo`).
- `GET /api/companies/my/profile` - Employer: Get logged-in employer's company.
- `GET /api/companies/:id` - Public: Get company details.

### Jobs (`/api/jobs`)
- `GET /api/jobs` - Public: List jobs with query params: `search`, `category`, `employmentType`, `location`, `page`, `limit`.
- `GET /api/jobs/:id` - Public: View full job details.
- `GET /api/jobs/categories/all` - Public: List all job categories.
- `GET /api/jobs/my/listings` - Employer: List jobs posted by logged-in employer.
- `POST /api/jobs` - Employer: Create new job posting.
- `PUT /api/jobs/:id` - Employer: Update own job posting.
- `DELETE /api/jobs/:id` - Employer/Admin: Delete job posting.

### Applications (`/api/applications`)
- `POST /api/applications` - Job Seeker: Apply to a job with `multipart/form-data` (`jobId`, `coverLetter`, `resume` file).
- `GET /api/applications/my` - Job Seeker: View personal applications with live status.
- `GET /api/applications/job/:id` - Employer: View applicants and resumes for employer's job.
- `PATCH /api/applications/:id/status` - Employer: Update application status (`shortlisted`, `rejected`, `selected`).

### Administrator (`/api/admin`)
- `GET /api/admin/dashboard` - Admin: MongoDB `$group` aggregation stats for users, jobs, applications.
- `GET /api/admin/users` - Admin: List all registered accounts.
- `PATCH /api/admin/users/:id/status` - Admin: Activate or deactivate account.
- `PATCH /api/admin/jobs/:id/review` - Admin: Moderate job posting (`approved`, `rejected`).
