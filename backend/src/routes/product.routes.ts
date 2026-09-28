import { Router } from "express";

import { getProductsController } from "../controllers/product.controller";

const router = Router();

router.get("/products", getProductsController);

export default router;