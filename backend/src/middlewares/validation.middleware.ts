import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

import { AppError } from "../errors/app-error";
import { ERROR_CODES } from "../errors/error-codes";

type RequestPart = "body" | "query" | "params";

export const validate = (
  schema: ZodType,
  part: RequestPart,
) => {
  return (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const result = schema.safeParse(req[part]);

    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      next(
        new AppError(
          400,
          ERROR_CODES.VALIDATION_ERROR,
          "Validation failed",
          details,
        ),
      );

      return;
    }

    req[part] = result.data;

    next();
  };
};

export const validateBody = (schema: ZodType) => {
  return validate(schema, "body");
};

export const validateQuery = (schema: ZodType) => {
  return validate(schema, "query");
};

export const validateParams = (schema: ZodType) => {
  return validate(schema, "params");
};