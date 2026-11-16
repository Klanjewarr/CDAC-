import { Router } from "express";
import {
  applyJob,
  getMyApplications,
  getJobApplications,
  updateApplicationStatus,
} from "../controllers/applicationController.js";
import { protect, authorize } from "../middleware/auth.js";
import { uploadResume } from "../middleware/upload.js";

const router = Router();

router.post("/", protect, authorize("jobseeker"), uploadResume.single("resume"), applyJob);
router.get("/my", protect, authorize("jobseeker"), getMyApplications);
router.get("/job/:id", protect, authorize("employer", "admin"), getJobApplications);
router.patch("/:id/status", protect, authorize("employer", "admin"), updateApplicationStatus);

export default router;
