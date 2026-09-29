import { Router } from "express";
import { loginController } from "../controllers/auth.controller";
import { validateBody } from "../middlewares/validation.middleware";
import { loginSchema } from "@nx-ecommerce/shared";

const router = Router();

router.post(
  "/auth/login",
  validateBody(loginSchema),
  loginController,
);

export default router;