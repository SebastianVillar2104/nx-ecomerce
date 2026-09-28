import { Request, Response, NextFunction } from "express";

import { validateCredentials } from "../services/auth.service";

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await validateCredentials(
      req.body.email,
      req.body.password,
    );

    res.json(result);
  } catch (error) {
    next(error);
  }
};