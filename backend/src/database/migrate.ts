import fs from "node:fs";
import path from "node:path";

import { postgresPool } from "./postgres";

const migrationsPath = path.resolve(
  __dirname,
  "../../../database/migrations",
);

const schemaMigrationsTableExists = async (): Promise<boolean> => {
  const result = await postgresPool.query(`
    SELECT EXISTS (
      SELECT 1
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_name = 'schema_migrations'
    );
  `);

  return result.rows[0].exists;
};

const runMigrations = async (): Promise<void> => {
  const files = fs
    .readdirSync(migrationsPath)
    .filter((file) => file.endsWith(".sql"))
    .sort();

  const hasSchemaMigrations = await schemaMigrationsTableExists();

  for (const file of files) {
    const client = await postgresPool.connect();

    try {
      const migration = fs.readFileSync(
        path.join(migrationsPath, file),
        "utf-8",
      );

      if (hasSchemaMigrations) {
        const result = await client.query(
          "SELECT 1 FROM schema_migrations WHERE name = $1",
          [file],
        );

        if (result.rowCount && result.rowCount > 0) {
          continue;
        }
      }

      await client.query("BEGIN");

      try {
        await client.query(migration);

        await client.query(
          "INSERT INTO schema_migrations (name) VALUES ($1)",
          [file],
        );

        await client.query("COMMIT");

        console.log(`Migration executed: ${file}`);
      } catch (error) {
        await client.query("ROLLBACK");
        throw error;
      }
    } finally {
      client.release();
    }
  }
};

runMigrations()
  .then(async () => {
    await postgresPool.end();
    console.log("Migrations completed.");
  })
  .catch(async (error) => {
    console.error("Migration failed:", error);
    await postgresPool.end();
    process.exit(1);
  });