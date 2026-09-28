import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { findAccountByEmail } from "../repositories/account.repository";
import { AppError } from "../errors/app-error";
import { ERROR_CODES } from "../errors/error-codes";
import type { LoginRequest } from "@nx-ecommerce/shared/src/auth/auth.schema";

export const validateCredentials = async (
  input: LoginRequest,
) => {
  const account = await findAccountByEmail(input.email);

  if (!account || !account.active) {
    throw new AppError(
      401,
      ERROR_CODES.INVALID_CREDENTIALS,
      "Invalid email or password",
    );
  }

  const passwordValid = await bcrypt.compare(
    input.password,
    account.password,
  );

  if (!passwordValid) {
    throw new AppError(
      401,
      ERROR_CODES.INVALID_CREDENTIALS,
      "Invalid email or password",
    );
  }

  const token = jwt.sign(
    {
      accountId: account.id,
      role: account.role,
    },
    env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );

  return {
    accountId: account.id,
    name: account.name,
    email: account.email,
    role: account.role,
    token,
  };
};