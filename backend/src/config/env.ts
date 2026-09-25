const PORT = Number(process.env.BACKEND_PORT) || 3000;

const POSTGRES_PORT = Number(process.env.POSTGRES_PORT) || 5432;

export const env = {
  PORT,
  POSTGRES_HOST: process.env.POSTGRES_HOST || "localhost",
  POSTGRES_PORT,
  POSTGRES_DB: process.env.POSTGRES_DB || "",
  POSTGRES_USER: process.env.POSTGRES_USER || "",
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || "",
};