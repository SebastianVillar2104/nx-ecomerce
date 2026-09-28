import { Router } from "express";
import healthRoutes from "./health.routes";
import productRoutes from "./product.routes";
import authRoutes from "./auth.routes";

const router = Router();

router.use(healthRoutes);
router.use(productRoutes);
router.use(authRoutes);

export default router;