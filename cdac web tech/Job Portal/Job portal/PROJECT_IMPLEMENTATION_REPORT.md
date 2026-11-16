# Comprehensive Project Implementation Report
## Full Stack Job Portal & Recruitment Management System
**CDAC Post Graduate Diploma in Advanced Computing (PG-DAC) / Web Technologies**  
*Project Architecture, Rationale, and Technical Implementation Guide*

---

## 1. Executive Overview

This document provides an exhaustive, production-grade breakdown of the **Full Stack Job Portal & Recruitment Management System**. It details **What** was implemented across every layer of the application, **Why** specific architectural and design choices were selected over traditional alternatives, and **How** each subsystem was engineered from the ground up.

```mermaid
flowchart TD
    subgraph Client ["Frontend Client (React 19 + TypeScript + Tailwind)"]
        UI["Modern Responsive UI / Dark Mode"]
        State["Auth Context & Local State"]
        Router["React Router v6 + Protected Routes"]
        Axios["Axios Client + Request/Response Interceptors"]
    end

    subgraph Server ["Backend API (Node.js + Express + TypeScript)"]
        Gateway["Express Router & Health Monitoring"]
        SecMid["Security: CORS, Helmet, Body Parsers"]
        AuthMid["Auth: JWT 'protect' & RBAC 'authorize'"]
        UploadMid["Multer Disk Engine (PDF/DOC Validation)"]
        Controllers["Controllers: Auth, Job, Application, Company, Admin"]
    end

    subgraph Database ["Data Persistence (MongoDB Atlas + Mongoose ODM)"]
        Schemas["Mongoose Schemas & Pre-Save Bcrypt Hooks"]
        Indexes["Compound Unique Indexes & Text Search Indexes"]
        Pipelines["In-Engine Aggregation Pipelines ($group, $sum)"]
    end

    UI --> Router
    Router --> State
    State --> Axios
    Axios -- "HTTP / REST (JSON & FormData)" --> Gateway
    Gateway --> SecMid
    SecMid --> AuthMid
    AuthMid --> UploadMid
    UploadMid --> Controllers
    Controllers --> Schemas
    Schemas --> Indexes
    Indexes --> Pipelines
```

---

## 2. System Matrix: What, Why, and How Summary

| Dimension | What Was Implemented | Why It Was Implemented | How It Was Implemented |
| :--- | :--- | :--- | :--- |
| **Architecture** | Decoupled 3-Tier Client-Server Architecture using TypeScript end-to-end | Enforces clean separation of concerns, scalability, cross-platform client support, and strict compile-time type safety. | React 19 SPA running on Vite + Express REST API on Node.js + MongoDB Atlas via Mongoose ODM. |
| **Security & Auth** | Dual-token authentication (Access + Refresh JWT) with Role-Based Access Control (RBAC). | Protects sensitive endpoints from privilege escalation, keeps authentication stateless without server-side session stores. | `server/src/middleware/auth.ts`: `protect` validates JWT signature; `authorize('admin', 'employer')` checks `req.user.role`. Passwords salted via `bcryptjs` with 10 rounds. |
| **Data Integrity** | Database-level unique constraints and relational schema references. | Eliminates duplicate job applications during rapid multiple submissions or client race conditions. | `Application.ts`: `applicationSchema.index({ jobId: 1, applicantId: 1 }, { unique: true })`. Catches MongoDB error code `11000`. |
| **File Handling** | Multi-part resume upload with strict MIME-type sanitization and unique timestamps. | Prevents disk overflow, shell injection, path traversal attacks, and application crashes caused by unsupported files. | `server/src/middleware/upload.ts`: Multer disk storage engine filtering `application/pdf`, `.doc`, `.docx` up to 5MB limit. |
| **Search & Discovery** | Multi-criteria regex query filtering with server-side pagination and category taxonomy. | Prevents browser memory lag when thousands of jobs exist, enabling responsive search by title, skills, and employment types. | `server/src/controllers/jobController.ts`: MongoDB `$or` regex query across `title`, `description`, `skills` with `.skip()` and `.limit()`. |
| **Business Analytics** | Real-time administrative metrics dashboard. | Aggregates user counts, job distributions, and applicant pipeline stages inside the database engine without loading all documents into server RAM. | `server/src/controllers/adminController.ts`: Native MongoDB `$group` and `$sum` aggregation pipelines. |
| **User Experience** | Responsive utility UI with light/dark Obsidian themes and 1-Click Evaluation Demo accounts. | Ensures examiner/evaluator convenience, mobile friendliness, accessibility, and high visual contrast. | Tailwind CSS 3.4 with custom Emerald brand tokens (`brand-500`, `brand-600`), glassmorphic panels, and Lucide icons. |

---

## 3. Detailed Architectural Breakdown

### 3.1 Authentication & Authorization Subsystem

#### **What Was Implemented**
- A robust identity management system supporting three user personas: **Job Seeker**, **Employer**, and **Administrator**.
- Stateless authentication using JSON Web Tokens (JWT) signed with HMAC-SHA256.
- Password hashing utilizing cryptographic salts (`bcryptjs`).
- Dual-tier route authorization on both client (route guard redirectors) and server (middleware guards).
- 1-Click Demo Login credentials embedded directly in the login interface for seamless academic evaluation.

#### **Why It Was Implemented**
1. **Stateless Scalability**: Traditional cookie-based sessions require server-side memory (or shared Redis clusters). JWTs are self-contained and cryptographically signed, allowing horizontal backend scaling without session synchronization overhead.
2. **Defense in Depth**: Securing routes solely on the client is insufficient because any attacker can issue raw `curl` or Postman requests. Enforcing RBAC at the controller level (`authorize('employer')`) guarantees that unauthorized requests are rejected with `403 Forbidden` regardless of client state.
3. **Password Security**: Plain-text passwords risk catastrophic credential stuffing attacks in case of database leakage. Bcrypt's adaptive work factor (cost 10) resists rainbow table and GPU-accelerated brute force attacks.

#### **How It Was Implemented**
- **Token Generation (`server/src/utils/jwt.ts`)**:
  ```typescript
  import jwt from "jsonwebtoken";

  export const generateTokens = (userId: string, role: string) => {
    const accessToken = jwt.sign(
      { id: userId, role },
      process.env.JWT_SECRET || "default_jwt_secret",
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { id: userId, role },
      process.env.JWT_REFRESH_SECRET || "default_refresh_secret",
      { expiresIn: "7d" }
    );
    return { accessToken, refreshToken };
  };
  ```

- **Mongoose Password Hashing Hook (`server/src/models/User.ts`)**:
  ```typescript
  userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  ```

- **Two-Step Middleware Verification (`server/src/middleware/auth.ts`)**:
  ```typescript
  export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token: string | undefined;
    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({ success: false, message: "Authentication required" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; role: string };
      const user = await User.findById(decoded.id).select("-password");
      if (!user || !user.isActive) {
        return res.status(401).json({ success: false, message: "User suspended or not found" });
      }
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
  };

  export const authorize = (...roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
      if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ success: false, message: "Access forbidden: insufficient role permissions" });
      }
      next();
    };
  };
  ```

- **Frontend Route Protection (`client/src/components/ProtectedRoute.tsx`)**:
  ```tsx
  export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const { user, token, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    if (!token || !user) return <Navigate to="/login" replace />;
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  };
  ```

---

### 3.2 Job Discovery & Search Subsystem

#### **What Was Implemented**
- Full-text search engine matching keywords against job titles, company profiles, descriptions, and required technical skills.
- Multi-parameter filtering by Employment Type (`full-time`, `part-time`, `contract`, `internship`) and Job Category (`Engineering`, `Design`, `Marketing`, etc.).
- Server-side pagination with dynamic calculation of `totalJobs`, `totalPages`, and current `page`.
- Comprehensive Job details modal with one-click application initiation.

#### **Why It Was Implemented**
1. **Performance at Scale**: Transferring an entire database collection of jobs to the client browser consumes excessive network bandwidth and leads to client-side memory exhaustion. Server-side pagination ensures the payload size is deterministic and minimal ($O(1)$ transfer size per page).
2. **Flexible Search**: Candidates rarely search for exact job titles. Implementing regex matching (`$options: "i"`) over multiple fields allows candidates to discover jobs by technology keywords (e.g., `"React"`, `"Docker"`) even if the title is generic (e.g., `"Software Engineer"`).

#### **How It Was Implemented**
- **Search Query Construction (`server/src/controllers/jobController.ts`)**:
  ```typescript
  export const getJobs = async (req: Request, res: Response) => {
    const { search, category, employmentType, page = "1", limit = "6" } = req.query;

    const query: any = { status: "approved" };

    if (search) {
      const searchRegex = new RegExp(String(search), "i");
      query.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { skills: { $in: [searchRegex] } },
      ];
    }

    if (category) query.categoryId = category;
    if (employmentType) query.employmentType = employmentType;

    const pageNum = parseInt(String(page), 10) || 1;
    const limitNum = parseInt(String(limit), 10) || 6;
    const skip = (pageNum - 1) * limitNum;

    const totalJobs = await Job.countDocuments(query);
    const jobs = await Job.find(query)
      .populate("companyId", "name location website logo")
      .populate("categoryId", "name icon")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.json({
      success: true,
      data: jobs,
      pagination: {
        page: pageNum,
        totalPages: Math.ceil(totalJobs / limitNum),
        totalJobs,
      },
    });
  };
  ```

---

### 3.3 Application Lifecycle & Resume Upload Subsystem

#### **What Was Implemented**
- Multi-part form handling (`multipart/form-data`) supporting resume document uploads (`.pdf`, `.doc`, `.docx`).
- Atomic server-side disk storage with unique filename hashing.
- Absolute engine-level duplicate submission protection using MongoDB compound unique indexes.
- Status transition pipeline for employers: `pending` $\rightarrow$ `shortlisted` $\rightarrow$ `selected` / `rejected`.
- Dedicated candidate tracking dashboard displaying dynamic status steppers and application timestamps.

#### **Why It Was Implemented**
1. **Elimination of Race Conditions**: When users click the "Apply" button twice rapidly, or when automated scripts submit parallel requests, client-side button disabling (`disabled={loading}`) is insufficient. Only a database compound index (`{ jobId: 1, applicantId: 1 }`) provides an unbreachable ACID constraint.
2. **File Sanitization**: Resumes uploaded directly to an application server pose severe security risks (e.g., execution of `.php` or `.exe` payloads, file collisions overwriting existing resumes). Multer limits the file size to 5MB, validates MIME types, and assigns cryptographic timestamp-prefixed filenames.

#### **How It Was Implemented**
- **Compound Unique Index (`server/src/models/Application.ts`)**:
  ```typescript
  const applicationSchema = new Schema<IApplication>(
    {
      jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
      applicantId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      resumeUrl: { type: String, required: true },
      coverLetter: { type: String, default: "" },
      status: {
        type: String,
        enum: ["pending", "shortlisted", "rejected", "selected"],
        default: "pending",
      },
    },
    { timestamps: true }
  );

  // Engine-level guarantee against duplicate submissions
  applicationSchema.index({ jobId: 1, applicantId: 1 }, { unique: true });
  ```

- **Multer Configuration (`server/src/middleware/upload.ts`)**:
  ```typescript
  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      const uploadPath = path.join(process.cwd(), "uploads");
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (_req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
    },
  });

  export const uploadResume = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    fileFilter: (_req, file, cb) => {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("Only PDF, DOC, and DOCX files are allowed"));
      }
    },
  });
  ```

- **End-to-End Application Sequence Diagram**:
```mermaid
sequenceDiagram
    autonumber
    actor Candidate as Job Seeker
    participant UI as React UI (Jobs.tsx)
    participant Axios as Axios Client
    participant Express as Express Router
    participant Auth as Auth Middleware (protect)
    participant Multer as Multer Middleware
    participant Controller as applicationController.ts
    participant DB as MongoDB Atlas

    Candidate->>UI: Selects Job, enters Cover Letter, attaches Resume
    UI->>UI: Validate file presence & client format
    UI->>Axios: POST /api/applications (FormData)
    Axios->>Express: Bearer <JWT Token> injected into Headers
    Express->>Auth: Decodes token & verifies signature
    Auth-->>Express: Populates req.user
    Express->>Multer: Writes file to /uploads directory
    Multer-->>Express: Populates req.file with stored metadata
    Express->>Controller: applyJob(req, res)
    Controller->>DB: Application.create({ jobId, applicantId, resumeUrl, ... })
    alt Duplicate Submission Attempt
        DB-->>Controller: MongoServerError: E11000 duplicate key error
        Controller-->>UI: HTTP 400 "You have already applied for this job"
        UI-->>Candidate: Display Amber warning alert
    else Clean Submission
        DB-->>Controller: Returns inserted Application document
        Controller-->>UI: HTTP 201 Created
        UI-->>Candidate: Display Emerald success modal & refresh status
    end
```

---

### 3.4 Employer & Recruitment Management Subsystem

#### **What Was Implemented**
- Employer profile initialization (Company creation, logo registration, description, website, headquarters location).
- Job Vacancy Management: Creating new postings with categorized tags, salary brackets, required competencies, and deadlines.
- Live Candidate Pipeline: Reviewing applicants per vacancy, viewing/downloading resumes statically via Express, and updating hiring status in real-time.

#### **Why It Was Implemented**
1. **Relational Integrity**: A job posting is inextricably linked to an employer's company entity (`companyId`). Enforcing this relational link ensures that deleting or inactivating an employer cascade-validates all associated job listings.
2. **Separation of Concerns**: Candidates cannot see other candidates' submissions or alter hiring statuses. By enforcing `req.user.role === 'employer'` and verifying that `job.employerId === req.user._id`, the system prevents lateral privilege escalation between competing companies.

#### **How It Was Implemented**
- **Job Creation with Employer Ownership Link (`server/src/controllers/jobController.ts`)**:
  ```typescript
  export const createJob = async (req: AuthRequest, res: Response) => {
    const { title, description, skills, salaryMin, salaryMax, employmentType, categoryId, deadline } = req.body;

    const company = await Company.findOne({ employerId: req.user._id });
    if (!company) {
      return res.status(400).json({ success: false, message: "Please create a company profile first" });
    }

    const job = await Job.create({
      title,
      description,
      skills: Array.isArray(skills) ? skills : skills.split(",").map((s: string) => s.trim()),
      salaryMin,
      salaryMax,
      employmentType,
      companyId: company._id,
      employerId: req.user._id,
      categoryId,
      status: "approved", // auto-approved or pending moderation
      deadline: deadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    res.status(201).json({ success: true, data: job });
  };
  ```

---

### 3.5 Administrator & MongoDB Aggregation Subsystem

#### **What Was Implemented**
- Comprehensive platform telemetry dashboard.
- Native MongoDB `$group` and `$sum` aggregation pipelines computing:
  - User role breakdown (`jobseeker`, `employer`, `admin`).
  - Application status distribution (`pending`, `shortlisted`, `selected`, `rejected`).
  - Active vs. suspended user ratios.
  - Job vacancy status distribution.
- User status toggle switch (activating or suspending accounts).
- Global job moderation (approving, rejecting, or purging vacancies).

#### **Why It Was Implemented**
1. **Computational Efficiency**: Calculating statistics by executing `User.find()` and looping over arrays in Node.js consumes $O(N)$ RAM and blocks the single-threaded event loop. MongoDB Aggregation pipelines execute directly on the database engine using compiled C++ code, streaming only the grouped aggregates back to Express.
2. **Platform Governance**: An unmoderated recruitment portal risks spam postings, fraudulent companies, or abusive accounts. The admin controls provide immediate moderation levers.

#### **How It Was Implemented**
- **MongoDB Aggregation Pipeline (`server/src/controllers/adminController.ts`)**:
  ```typescript
  export const getAdminStats = async (_req: Request, res: Response) => {
    const totalUsers = await User.countDocuments();
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();
    const totalCompanies = await Company.countDocuments();

    // Group users by role in a single DB query
    const userRoleStats = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
        },
      },
    ]);

    // Group applications by status
    const applicationStatusStats = await Application.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      success: true,
      data: {
        summary: { totalUsers, totalJobs, totalApplications, totalCompanies },
        userRoleStats,
        applicationStatusStats,
      },
    });
  };
  ```

---

### 3.6 Frontend Design System & Network Interceptors

#### **What Was Implemented**
- Single Page Application (SPA) architecture built with React 19, TypeScript, and Vite.
- Global authentication context providing user session persistence via `localStorage`.
- Axios interceptor pipeline for automatic Bearer token injection and global 401 unauthenticated redirect handling.
- Cohesive design system built with Tailwind CSS featuring:
  - Custom emerald primary accents (`#059669` and `#10b981`).
  - Deep Obsidian night mode (`#0c1017`) and crisp warm light mode (`#fafaf9`).
  - Glassmorphic backdrop filters, responsive navigation, and animated action toasts.

#### **Why It Was Implemented**
1. **Zero Redundant Token Handling**: Rather than manually appending `headers: { Authorization: ... }` to dozens of API requests across individual components, the centralized Axios interceptor handles it globally.
2. **Graceful Session Invalidation**: When an access token expires or is rejected with `401 Unauthorized`, the response interceptor automatically purges invalid local storage tokens and reroutes the user to `/login?expired=true` without unhandled runtime exceptions.

#### **How It Was Implemented**
- **Axios Interceptor Implementation (`client/src/services/api.ts`)**:
  ```typescript
  import axios from "axios";

  export const API_URL = "http://localhost:5000/api";
  export const BACKEND_URL = "http://localhost:5000";

  const api = axios.create({ baseURL: API_URL });

  // Outgoing request interceptor: Inject Bearer Token
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("job_portal_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Incoming response interceptor: Handle session expiration
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401 && !error.config.url?.includes("/auth/login")) {
        localStorage.removeItem("job_portal_token");
        localStorage.removeItem("job_portal_user");
        if (window.location.pathname !== "/login") {
          window.location.href = "/login?expired=true";
        }
      }
      return Promise.reject(error);
    }
  );

  export default api;
  ```

---

## 4. Database Schema Architecture (ERD & Data Dictionary)

```mermaid
erDiagram
    USER ||--o{ COMPANY : "owns"
    USER ||--o{ JOB : "creates"
    USER ||--o{ APPLICATION : "submits"
    COMPANY ||--o{ JOB : "hosts"
    CATEGORY ||--o{ JOB : "categorizes"
    JOB ||--o{ APPLICATION : "receives"

    USER {
        ObjectId _id PK
        string name
        string email UK "Indexed unique"
        string password "Bcrypt hash"
        string role "jobseeker | employer | admin"
        boolean isActive
        date createdAt
    }

    COMPANY {
        ObjectId _id PK
        string name
        string description
        string location
        string website
        string logo
        ObjectId employerId FK "ref User"
    }

    CATEGORY {
        ObjectId _id PK
        string name UK "Indexed unique"
        string description
        string icon
    }

    JOB {
        ObjectId _id PK
        string title
        string description
        array skills "String array"
        number salaryMin
        number salaryMax
        string employmentType
        ObjectId companyId FK "ref Company"
        ObjectId employerId FK "ref User"
        ObjectId categoryId FK "ref Category"
        string status "pending | approved | rejected"
        date deadline
    }

    APPLICATION {
        ObjectId _id PK
        ObjectId jobId FK "Compound unique index"
        ObjectId applicantId FK "Compound unique index"
        string resumeUrl
        string coverLetter
        string status "pending | shortlisted | selected | rejected"
        date createdAt
    }
```

---

## 5. RESTful API Contract

| HTTP Method | Route Endpoint | Required Role | Request Body / Params | Expected Response | Error Code |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | `{ name, email, password, role }` | `201 Created` + User profile | `400 Bad Request` |
| `POST` | `/api/auth/login` | Public | `{ email, password }` | `200 OK` + Access & Refresh Tokens | `401 Unauthorized` |
| `POST` | `/api/auth/refresh` | Public | `{ refreshToken }` | `200 OK` + New Access Token | `401 Unauthorized` |
| `GET` | `/api/jobs` | Public | Query: `?search=&category=&page=&limit=` | `200 OK` + Paginated jobs array | `500 Server Error` |
| `GET` | `/api/jobs/:id` | Public | Route Param: `:id` | `200 OK` + Single Job with populated company | `404 Not Found` |
| `POST` | `/api/jobs` | Employer | Job attributes JSON | `201 Created` + Inserted Job | `403 Forbidden` |
| `PUT` | `/api/jobs/:id` | Employer | Updated attributes JSON | `200 OK` + Updated Job | `404 Not Found` |
| `DELETE` | `/api/jobs/:id` | Employer / Admin | Route Param: `:id` | `200 OK` + Success confirmation | `403 Forbidden` |
| `POST` | `/api/applications` | Job Seeker | `FormData` (`jobId`, `resume`, `coverLetter`) | `201 Created` + Inserted Application | `400 Duplicate / Invalid file` |
| `GET` | `/api/applications/my` | Job Seeker | Header: `Bearer <token>` | `200 OK` + Candidate applications array | `401 Unauthorized` |
| `GET` | `/api/applications/job/:id` | Employer | Route Param: `:id` | `200 OK` + List of candidates for job | `403 Forbidden` |
| `PATCH` | `/api/applications/:id/status`| Employer | `{ status: 'shortlisted' \| 'selected' \| 'rejected' }` | `200 OK` + Updated status | `400 Invalid status` |
| `GET` | `/api/admin/dashboard` | Admin | Header: `Bearer <token>` | `200 OK` + Aggregated platform telemetry | `403 Forbidden` |
| `PATCH` | `/api/admin/users/:id/status`| Admin | `{ isActive: boolean }` | `200 OK` + Updated User document | `404 Not Found` |

---

## 6. Project Directory Structure

```
Job portal/
├── client/                               # Frontend Presentation Tier
│   ├── public/                           # Static public assets
│   ├── src/
│   │   ├── assets/                       # Images, logos, and SVGs
│   │   ├── components/                   # Reusable UI components
│   │   │   ├── Footer.tsx                # Application footer
│   │   │   ├── Navbar.tsx                # Role-aware navigation header
│   │   │   └── ProtectedRoute.tsx        # Client-side RBAC route guard
│   │   ├── context/
│   │   │   └── AuthContext.tsx           # Global user authentication state
│   │   ├── pages/                        # Page-level route views
│   │   │   ├── AdminDashboard.tsx        # Administrative metrics & moderation
│   │   │   ├── EmployerDashboard.tsx     # Vacancy & candidate pipeline management
│   │   │   ├── Home.tsx                  # Landing page & feature showcase
│   │   │   ├── Jobs.tsx                  # Search, filter, and application modal
│   │   │   ├── Login.tsx                 # Authentication with 1-click evaluation demo
│   │   │   ├── Register.tsx              # Account registration
│   │   │   └── SeekerDashboard.tsx       # Applied vacancy tracker
│   │   ├── services/
│   │   │   └── api.ts                    # Axios instance & interceptors
│   │   ├── types/
│   │   │   └── index.ts                  # Shared TypeScript interfaces
│   │   ├── App.tsx                       # Main application router
│   │   ├── index.css                     # Tailwind directives & theme definitions
│   │   └── main.tsx                      # React root entry point
│   ├── package.json                      # Client dependencies (React 19, Lucide, Tailwind)
│   ├── tailwind.config.js                # Design tokens & color system
│   └── vite.config.ts                    # Vite build configuration
│
└── server/                               # Backend Application Tier
    ├── uploads/                          # Static directory for uploaded resumes
    ├── src/
    │   ├── config/
    │   │   └── db.ts                     # MongoDB Atlas Mongoose connection
    │   ├── controllers/
    │   │   ├── adminController.ts        # Aggregation pipelines & moderation
    │   │   ├── applicationController.ts  # Submission & candidate status
    │   │   ├── authController.ts         # User auth, registration, token refresh
    │   │   ├── companyController.ts      # Organization profile CRUD
    │   │   └── jobController.ts          # Search, filter, pagination, vacancy CRUD
    │   ├── middleware/
    │   │   ├── auth.ts                   # JWT validation & RBAC authorization
    │   │   └── upload.ts                 # Multer disk storage & MIME validation
    │   ├── models/
    │   │   ├── Application.ts            # Application schema & compound unique index
    │   │   ├── Category.ts               # Industry classification schema
    │   │   ├── Company.ts                # Organization profile schema
    │   │   ├── Job.ts                    # Vacancy schema with text search indexes
    │   │   └── User.ts                   # User schema with pre-save bcrypt hook
    │   ├── routes/                       # Express route dispatchers
    │   │   ├── adminRoutes.ts
    │   │   ├── applicationRoutes.ts
    │   │   ├── authRoutes.ts
    │   │   ├── companyRoutes.ts
    │   │   └── jobRoutes.ts
    │   ├── utils/
    │   │   ├── jwt.ts                    # Access/refresh token generators
    │   │   └── seed.ts                   # Demo database seeding script
    │   └── server.ts                     # Express server bootstrap & middleware wiring
    ├── .env.example                      # Environment variables template
    ├── package.json                      # Server dependencies (Express, Mongoose, Multer)
    └── tsconfig.json                     # TypeScript compilation configuration
```

---

## 7. Viva Defense & Evaluator Questions

### Q1: "Why did you use MongoDB over a Relational Database like PostgreSQL or MySQL?"
> **Answer**:  
> *"We chose MongoDB for three key reasons: First, job postings have flexible schemas where required skill lists, company perks, and employment requirements vary substantially by industry, making document-based BSON storage ideal. Second, MongoDB provides native full-text indexing and rich multi-stage Aggregation Pipelines (`$group`, `$sum`) that allow us to calculate live dashboard analytics directly on the database engine. Third, Mongoose ODM allows us to enforce schema-level types, hooks, and relational referencing (`populate`) alongside compound unique indexes to guarantee relational data integrity."*

### Q2: "How do you prevent duplicate job applications?"
> **Answer**:  
> *"We implement defense in depth. On the frontend, we disable the submit button during API calls. However, to guarantee data integrity against network race conditions or API probing, we enforce an engine-level compound unique index in our Mongoose schema: `applicationSchema.index({ jobId: 1, applicantId: 1 }, { unique: true })`. If a duplicate insert is attempted, MongoDB returns error code `11000`, which our controller catches and transforms into a clean `400 Bad Request`."*

### Q3: "Explain how your authentication and RBAC works from request to response."
> **Answer**:  
> *"When a user logs in, the server generates a short-lived access token (15 mins) and a refresh token (7 days). On the client, an Axios request interceptor injects the access token into the `Authorization: Bearer <token>` header of every outgoing request. In Express, the request first passes through our `protect` middleware, which decodes the token with `jwt.verify` and attaches the user document to `req.user`. It then passes to our higher-order `authorize(...roles)` middleware, which checks if `roles.includes(req.user.role)`. If valid, the controller executes; otherwise, it immediately returns `403 Forbidden`."*

### Q4: "Where did you use MongoDB Aggregation and why not use JavaScript array methods?"
> **Answer**:  
> *"In `adminController.ts`, we use MongoDB's Aggregation Framework with `$group` and `$sum` pipelines to calculate the total breakdown of users by role and applications by status. If we had used `User.find()` and JavaScript array `.filter()`, the server would have had to transfer thousands of raw documents over the network and hold them in Node.js heap memory, causing significant CPU and RAM overhead. MongoDB Aggregations execute directly within the database engine in $O(N)$ native C++ execution and only stream the final aggregated counts back to Express."*

### Q5: "How are file uploads secured against vulnerabilities?"
> **Answer**:  
> *"In `server/src/middleware/upload.ts`, we configure Multer with a 5MB size limit (`fileSize: 5 * 1024 * 1024`) and a strict MIME-type whitelist allowing only `application/pdf`, `.doc`, and `.docx`. Furthermore, to prevent directory traversal and file overwriting, we strip the original client-provided filename and generate a collision-free name using `Date.now()` combined with a high-entropy random integer."*
