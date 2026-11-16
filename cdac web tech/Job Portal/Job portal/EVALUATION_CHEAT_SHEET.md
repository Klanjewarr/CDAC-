# Evaluation & Viva Defense Cheat Sheet
*Job Portal & Application Management System*

Keep this cheat sheet handy during your project demo and viva. It directly answers the questions evaluators ask according to **Sections 13 & 14** of the assignment guidelines.

---

### Q1: "Show me your MongoDB connection configuration and explain how the backend connects."
- **File to show**: [`server/src/config/db.ts`](file:///c:/Users/kanch/Desktop/cdac/cdac%20web%20tech/Job%20Portal/Job%20portal/server/src/config/db.ts)
- **Answer**:
  > *"We created an isolated database module `config/db.ts` that exports an async function `connectionDB`. It reads the cloud connection string from environment variables (`process.env.MONGODB_URL`) using `dotenv`. We call `await mongoose.connect(mongoUrl)`. We wrapped it in a `try...catch` block with `process.exit(1)` on error so the server fails fast if MongoDB is unreachable, preventing unhandled runtime crashes."*

---

### Q2: "How do you prevent a user from applying for the same job twice?"
- **File to show**: [`server/src/models/Application.ts`](file:///c:/Users/kanch/Desktop/cdac/cdac%20web%20tech/Job%20Portal/Job%20portal/server/src/models/Application.ts)
- **Answer**:
  > *"We enforce duplicate prevention at both the application level and the database engine level. In `models/Application.ts`, we created a **Compound Unique Index**:*
  > ```ts
  > applicationSchema.index({ jobId: 1, applicantId: 1 }, { unique: true });
  > ```
  > *This guarantees that even if a user double-clicks the apply button or two requests arrive simultaneously (race condition), MongoDB rejects the duplicate document with error code 11000."*

---

### Q3: "How is password security handled? Do you store plain text passwords?"
- **File to show**: [`server/src/models/User.ts`](file:///c:/Users/kanch/Desktop/cdac/cdac%20web%20tech/Job%20Portal/Job%20portal/server/src/models/User.ts)
- **Answer**:
  > *"Passwords are never stored in plain text. In `models/User.ts`, we implemented a Mongoose `pre('save')` hook. Whenever a user is registered or changes their password, Mongoose generates a cryptographic salt using `bcrypt.genSalt(10)` and hashes the password with `bcrypt.hash()`. During login, we use `bcrypt.compare()` in our `comparePassword` instance method."*

---

### Q4: "How does JWT authentication and Role-Based Access Control (RBAC) work?"
- **File to show**: [`server/src/middleware/auth.ts`](file:///c:/Users/kanch/Desktop/cdac/cdac%20web%20tech/Job%20Portal/Job%20portal/server/src/middleware/auth.ts)
- **Answer**:
  > *"When a user logs in, the backend signs an access token containing `userId` and `role`. The frontend Axios interceptor attaches this token in the `Authorization: Bearer <token>` header on every request. On private backend routes, our `protect` middleware verifies the token signature, finds the user in MongoDB, and attaches them to `req.user`. Then, our `authorize('admin', 'employer')` middleware factory checks if `req.user.role` matches the required role. If not, it rejects with HTTP 403 Forbidden."*

---

### Q5: "Where did you use MongoDB Aggregation in your project?"
- **File to show**: [`server/src/controllers/adminController.ts`](file:///c:/Users/kanch/Desktop/cdac/cdac%20web%20tech/Job%20Portal/Job%20portal/server/src/controllers/adminController.ts)
- **Answer**:
  > *"In `adminController.ts`, we use MongoDB aggregation pipelines to calculate the live platform dashboard metrics:
  > 1. `User.aggregate([{ $group: { _id: '$role', count: { $sum: 1 } } }])` groups users and counts how many are job seekers vs employers vs admins.
  > 2. `Application.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }])` groups applications by their status (`pending`, `shortlisted`, `selected`, `rejected`).
  > This is processed directly on the database engine rather than fetching all rows into memory."*

---

### Q6: "How did you implement Tailwind CSS and responsiveness?"
- **Files to show**: [`client/tailwind.config.js`](file:///c:/Users/kanch/Desktop/cdac/cdac%20web%20tech/Job%20Portal/Job%20portal/client/tailwind.config.js) & [`client/src/pages/Home.tsx`](file:///c:/Users/kanch/Desktop/cdac/cdac%20web%20tech/Job%20Portal/Job%20portal/client/src/pages/Home.tsx)
- **Answer**:
  > *"We configured Tailwind CSS using utility classes for layout, typography, flexbox, and CSS grid (e.g. `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`). For responsiveness, we used responsive prefixes `sm:`, `md:`, and `lg:`. For dark mode, we enabled `darkMode: 'class'` in `tailwind.config.js` and toggle the `dark` class on `<html>` dynamically via our React `AuthContext`."*

---

### Q7: "How does the frontend talk to the backend?"
- **File to show**: [`client/src/services/api.ts`](file:///c:/Users/kanch/Desktop/cdac/cdac%20web%20tech/Job%20Portal/Job%20portal/client/src/services/api.ts)
- **Answer**:
  > *"We created an Axios instance pointing to `http://localhost:5000/api`. We added a request interceptor that automatically reads the JWT from `localStorage` and injects `Authorization: Bearer <token>`. We also added a response interceptor that catches HTTP 401 Unauthorized errors and clears local storage if the session expires."*
