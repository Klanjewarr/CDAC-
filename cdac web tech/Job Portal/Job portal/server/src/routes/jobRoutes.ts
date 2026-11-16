import { Router } from "express";
import {
  createJob,
  getJobs,
  getJobById,
  getMyJobs,
  updateJob,
  deleteJob,
  getCategories,
} from "../controllers/jobController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

router.get("/categories/all", getCategories);
router.get("/", getJobs);
router.get("/my/listings", protect, authorize("employer"), getMyJobs);
router.get("/:id", getJobById);
router.post("/", protect, authorize("employer", "admin"), createJob);
router.put("/:id", protect, authorize("employer", "admin"), updateJob);
router.delete("/:id", protect, authorize("employer", "admin"), deleteJob);

export default router;
