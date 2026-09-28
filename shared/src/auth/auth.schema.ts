import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type LoginRequest = z.infer<typeof loginSchema>;

export interface LoginResponse {
  accountId: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "ADMIN";
  token: string;
}