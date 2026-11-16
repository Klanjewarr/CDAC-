import { Router } from "express";
import { createCompany, getCompanyById, getMyCompany, updateCompany } from "../controllers/companyController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

router.post("/", protect, authorize("employer", "admin"), createCompany);
router.get("/my/profile", protect, authorize("employer"), getMyCompany);
router.get("/:id", getCompanyById);
router.put("/:id", protect, authorize("employer", "admin"), updateCompany);

export default router;
