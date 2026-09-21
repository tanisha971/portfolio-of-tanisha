import { Router } from "express";

import {
  getAsset,
  upsertAsset,
} from "../controllers/assetController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = Router();

// ----------------------------------------
// Public
// ----------------------------------------

router.get("/:key", getAsset);

// ----------------------------------------
// Admin
// ----------------------------------------

router.put("/:key", protect, upsertAsset);

export default router;