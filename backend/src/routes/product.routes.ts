import { Router } from "express";
import { getProductsController } from "../controllers/product.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";

const router = Router();

router.get(
  "/products",
  authMiddleware,
  requireRole("CUSTOMER", "ADMIN"),
  getProductsController,
);

export default router;