import { Router } from "express";

import { getProductsController } from "../controllers/product.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/products", authMiddleware, getProductsController);

export default router;