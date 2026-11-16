# Master Architecture, System Design & Live Code Modification Guide
*How to Explain Your Project, Walk Through the Flow, and Make Any Live Code Changes On Demand*

---

## Part 1: How to Explain the System Design & Flow (Your 90-Second Viva Pitch)

When the examiner says: *"Explain the architecture and how data flows through your application,"* speak with confidence and deliver this exact 4-step explanation:

```
[React + Tailwind UI]
       │
       ▼ (1) User clicks action, Axios sends HTTP Request (JSON or FormData + JWT Bearer)
[Express Routing: /api/...]
       │
       ▼ (2) Middleware Check: CORS -> Auth (verify JWT signature) -> RBAC (check role)
[Controllers (Business Logic)]
       │
       ▼ (3) Mongoose Model (Schema validation, pre-save bcrypt hooks, compound unique indexes)
[MongoDB Atlas Cloud]
       │
       ▲ (4) Data returned as JSON -> React State updates -> Tailwind UI re-renders
```

> **Your Script for the Evaluator**:
> *"Our application follows a decoupled 3-tier MERN architecture:*
> 1. *The **Frontend Client** is built with React 19, TypeScript, and Tailwind CSS. Client-side routing is handled by React Router, with role-based route guards (`ProtectedRoute.tsx`). Global state and user tokens are managed via an `AuthContext`.*
> 2. *The **Communication Layer** uses an Axios instance with automatic request interceptors that inject the `Authorization: Bearer <token>` header.*
> 3. *The **Backend Server** is built with Node.js, Express, and TypeScript. Incoming requests pass through security middleware (CORS, Helmet), then through our authentication middleware `protect` (which decodes the JWT and fetches the user), and then through our RBAC middleware `authorize('admin', 'employer')` to ensure role isolation.*
> 4. *The **Database Layer** connects to MongoDB Atlas using Mongoose ODM. We enforce schema validation, pre-save password hashing with `bcryptjs`, MongoDB `$group` aggregation pipelines for the admin dashboard, and compound unique indexes (`{ jobId: 1, applicantId: 1 }`) to eliminate duplicate job applications at the database level."*

---

## Part 2: If the Examiner Asks You to Make a Live Code Change

Examiners often test if you wrote the code by asking: *"Can you change X right now?"*
Here is the cheat sheet of the 5 most common evaluator requests and exactly which files to open:

### 1. "Add a new field (e.g. `experienceLevel` to a Job)"
- **Step 1: Database Model** -> Open `server/src/models/Job.ts`:
  - Add to Interface: `experienceLevel?: string;`
  - Add to Schema:
    ```ts
    experienceLevel: {
      type: String,
      default: "1-3 years",
    },
    ```
- **Step 2: Controller** -> Open `server/src/controllers/jobController.ts`:
  - In `createJob`: Destructure `experienceLevel` from `req.body` and pass it into `Job.create({ ..., experienceLevel })`.
- **Step 3: Frontend Form** -> Open `client/src/pages/EmployerDashboard.tsx`:
  - Add an input `<input value={experience} onChange={...} />` and include `experienceLevel` in the `api.post("/jobs", ...)` payload.

---

### 2. "Add a new Status option (e.g. 'Interviewing' for applications)"
- **Step 1** -> Open `server/src/models/Application.ts`:
  - Update enum in `IApplication`:
    ```ts
    status: "pending" | "shortlisted" | "rejected" | "selected" | "interviewing";
    ```
  - Update enum in Schema:
    ```ts
    enum: ["pending", "shortlisted", "rejected", "selected", "interviewing"]
    ```
- **Step 2** -> Open `server/src/controllers/applicationController.ts`:
  - In `updateApplicationStatus`: Add `"interviewing"` to the allowed status validation array.
- **Step 3** -> Open `client/src/pages/EmployerDashboard.tsx`:
  - Add a button:
    ```tsx
    <button onClick={() => handleUpdateStatus(app._id, "interviewing")}>
      Interview
    </button>
    ```

---

### 3. "Change Pagination limit (e.g. from 6 to 10 jobs per page)"
- **Step 1** -> Open `client/src/pages/Jobs.tsx`:
  - Find `params.set("limit", "6");`
  - Change `"6"` to `"10"` (or whatever number they ask).
- **Step 2** -> Open `server/src/controllers/jobController.ts`:
  - Find `const limitNum = parseInt(String(limit), 10) || 10;`. That's where the backend parses the limit.

---

### 4. "Change the styling (e.g. change button color from blue to emerald/green)"
- **Answer**:
  > *"Because we use Tailwind CSS utility classes, we don't need to rewrite complex CSS stylesheets. We simply change the class on the element!"*
- **Example**:
  - Open `client/src/pages/Home.tsx` or `client/src/components/Navbar.tsx`:
  - Replace `bg-brand-600 hover:bg-brand-700` with `bg-emerald-600 hover:bg-emerald-700`.

---

### 5. "How do you protect a route so only Admins can access it?"
- **Backend Protection**:
  - Open `server/src/routes/adminRoutes.ts`:
    ```ts
    router.use(protect, authorize("admin"));
    ```
- **Frontend UI Guard**:
  - Open `client/src/App.tsx`:
    ```tsx
    <Route
      path="/admin"
      element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <AdminDashboard />
        </ProtectedRoute>
      }
    />
    ```

---

## Part 3: How to Learn and Internalize All of This in 20 Minutes

Follow this 3-step rapid revision routine:

### Step 1: Trace ONE Complete Flow with Your Eyes (5 mins)
Follow what happens when a Job Seeker logs in and applies for a job:
1. `client/src/pages/Login.tsx` -> calls `login(email, password)` from `client/src/context/AuthContext.tsx`.
2. `AuthContext.tsx` sends `POST /api/auth/login` to `server/src/controllers/authController.ts`.
3. `authController.ts` calls `user.comparePassword(password)` (using `bcrypt.compare`).
4. On success, `generateTokens()` generates a JWT signed with `process.env.JWT_SECRET`.
5. Frontend saves token in `localStorage`.
6. When applying in `Jobs.tsx`, Axios interceptor in `client/src/services/api.ts` attaches `Authorization: Bearer <token>`.
7. `server/src/routes/applicationRoutes.ts` runs `protect` middleware -> then `uploadResume.single("resume")` (Multer) -> then `applyJob` controller.
8. `applyJob` checks deadline and duplicate applications, saves document to MongoDB, and returns HTTP 201 Created!

### Step 2: Memorize the 4 Database Collections (5 mins)
- **User**: name, email (unique), password (bcrypt), role (`admin` | `employer` | `jobseeker`).
- **Company**: name, description, location, website, logo, `employerId` (ref User).
- **Job**: title, description, skills (array), salaryMin, salaryMax, companyId, employerId, categoryId, status, deadline.
- **Application**: jobId, applicantId, resumeUrl, coverLetter, status. (Compound unique index `{ jobId: 1, applicantId: 1 }`).

### Step 3: Run the App and Click Through Every Screen (10 mins)
1. Run `npm run dev` in `Job portal/server`.
2. Run `npm run dev` in `Job portal/client`.
3. Open `http://localhost:5173`.
4. Click **Admin** demo login -> Inspect the MongoDB aggregation metrics.
5. Log out -> Click **Employer** demo login -> Look at the applicants and download a resume.
6. Log out -> Click **Seeker** demo login -> Search for a job and track application status.
