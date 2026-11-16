import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";
import { connectionDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Health Check Route
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    message: "Job Portal API is running successfully!",
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes matching Assignment Specification (Section 6)
app.use("/api/auth", authRoutes);
app.use("/api/users", authRoutes); // handles /api/users/profile
app.use("/api/companies", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/admin", adminRoutes);

// 404 Route Handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: "API endpoint not found" });
});

// Global Error Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled Error:", err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start Server after connecting to Database
const startServer = async () => {
  await connectionDB();
  console.log("Database connected successfully! 🚀");

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
