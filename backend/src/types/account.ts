export type Role = "CUSTOMER" | "ADMIN";

export interface Account {
  id: string;
  name: string;
  email: string;
  password: string;
  active: boolean;
  role: Role;
}