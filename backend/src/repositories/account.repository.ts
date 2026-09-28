import { postgresPool } from "../database/postgres";
import { Account } from "../types/account";

export const findAccountByEmail = async (
  email: string,
): Promise<Account | null> => {
  const result = await postgresPool.query<Account>(
    `
      SELECT
        id,
        name,
        email,
        password,
        active,
        role
      FROM account
      WHERE email = $1
      LIMIT 1;
    `,
    [email],
  );

  return result.rows[0] ?? null;
};