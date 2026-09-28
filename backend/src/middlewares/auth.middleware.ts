import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { AppError } from "../errors/app-error";
import { ERROR_CODES } from "../errors/error-codes";
import { AuthPayload } from "../types/auth";

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization?.startsWith("Bearer ")) {
      throw new AppError(
        401,
        ERROR_CODES.UNAUTHORIZED,
        "Authentication required",
      );
    }

    const token = authorization.substring("Bearer ".length);

    const payload = jwt.verify(
      token,
      env.JWT_SECRET,
    ) as AuthPayload;

    req.auth = {
      accountId: payload.accountId,
      role: payload.role,
    };
    next();
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
      return;
    }

    next(
      new AppError(
        401,
        ERROR_CODES.UNAUTHORIZED,
        "Invalid or expired token",
      ),
    );
  }
};