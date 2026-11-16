import { Router } from "express";
import {
  getAdminStats,
  reviewJob,
  getAllUsers,
  toggleUserStatus,
} from "../controllers/adminController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

// Protect all admin routes
router.use(protect, authorize("admin"));

router.get("/dashboard", getAdminStats);
router.patch("/jobs/:id/review", reviewJob);
router.get("/users", getAllUsers);
router.patch("/users/:id/status", toggleUserStatus);

export default router;
