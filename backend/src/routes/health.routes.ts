import { Router } from "express";
import {
  healthController,
  databaseHealthController,
} from "../controllers/health.controller";

const router = Router();

router.get("/health", healthController);
router.get("/health/db", databaseHealthController);

export default router;