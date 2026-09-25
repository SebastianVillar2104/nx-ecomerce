import { postgresPool } from "../database/postgres";

export const checkDatabaseConnection = async (): Promise<void> => {
  await postgresPool.query("SELECT 1");
};