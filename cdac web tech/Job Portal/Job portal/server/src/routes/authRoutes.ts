import { Router } from "express";
import { register, login, refresh, getProfile, updateProfile } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

export default router;
