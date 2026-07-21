import { Router } from "express";
import { loginUser, getCurrentUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/login", loginUser);
router.get("/me", protect, getCurrentUser);

export default router;