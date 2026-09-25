import { checkDatabaseConnection } from "../repositories/health.repository";

export const checkDatabaseHealth = async (): Promise<void> => {
  await checkDatabaseConnection();
};