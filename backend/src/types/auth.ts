import { Role } from "./account";

export interface AuthPayload {
  accountId: string;
  role: Role;
}