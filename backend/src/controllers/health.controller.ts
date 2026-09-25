import { Request, Response, NextFunction } from "express";
import { checkDatabaseHealth } from "../services/health.service";

export const healthController = (_req: Request, res: Response) => {
  res.json({ status: "ok" });
};

export const databaseHealthController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await checkDatabaseHealth();

    res.json({ status: "ok" });
  } catch (error) {
    next(error);
  }
};