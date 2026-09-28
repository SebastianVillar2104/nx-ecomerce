import { Request, Response, NextFunction } from "express";

import { AppError } from "../errors/app-error";
import { ERROR_CODES } from "../errors/error-codes";
import { Role } from "../types/account";

export const requireRole = (...allowedRoles: Role[]) => {
  return (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    if (!req.auth) {
      next(
        new AppError(
          401,
          ERROR_CODES.UNAUTHORIZED,
          "Authentication required",
        ),
      );

      return;
    }

    if (!allowedRoles.includes(req.auth.role)) {
      next(
        new AppError(
          403,
          ERROR_CODES.FORBIDDEN,
          "Insufficient permissions",
        ),
      );

      return;
    }

    next();
  };
};