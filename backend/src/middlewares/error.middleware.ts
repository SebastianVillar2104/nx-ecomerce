import { Request, Response, NextFunction } from "express";

import { AppError } from "../errors/app-error";
import { ERROR_CODES } from "../errors/error-codes";

export const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(err);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
      },
    });

    return;
  }

  res.status(500).json({
    error: {
      code: ERROR_CODES.INTERNAL_SERVER_ERROR,
      message: "Internal server error",
    },
  });
};