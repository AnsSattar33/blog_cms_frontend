import type { User, UserRole } from "@/types";

export const ADMIN_ROLE: UserRole = "admin";

export function isAdmin(user: User | null | undefined): boolean {
  return user?.role === ADMIN_ROLE;
}
