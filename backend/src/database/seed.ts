import fs from "node:fs";
import path from "node:path";

import { postgresPool } from "./postgres";

const seedsPath = path.resolve(
  __dirname,
  "../../../database/seeds",
);

const runSeeds = async (): Promise<void> => {
  const files = fs
    .readdirSync(seedsPath)
    .filter((file) => file.endsWith(".sql"))
    .sort();

  for (const file of files) {
    const client = await postgresPool.connect();

    try {
      const seed = fs.readFileSync(
        path.join(seedsPath, file),
        "utf-8",
      );

      await client.query("BEGIN");

      try {
        await client.query(seed);

        await client.query("COMMIT");

        console.log(`Seed executed: ${file}`);
      } catch (error) {
        await client.query("ROLLBACK");
        throw error;
      }
    } finally {
      client.release();
    }
  }
};

runSeeds()
  .then(async () => {
    await postgresPool.end();
    console.log("Seeds completed.");
  })
  .catch(async (error) => {
    console.error("Seed failed:", error);
    await postgresPool.end();
    process.exit(1);
  });