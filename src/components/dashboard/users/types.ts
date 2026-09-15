export type AdminUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  role?: string | null;
  banned?: boolean | null;
  createdAt: Date | string;
};

export function roleLabel(role?: string | null) {
  return role ?? "user";
}
