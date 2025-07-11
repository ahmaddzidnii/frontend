import type { QueryKey } from "@tanstack/react-query";

/**
 * Query Keys untuk fitur Auth (misal: login, me, dll)
 */
export const authKeys = {
  all: ["auth"] as QueryKey,
  me: () => [...authKeys.all, "session"] as QueryKey,
};

/**
 * Contoh tambahan jika kamu punya fitur user management
 */
export const userKeys = {
  all: ["users"] as QueryKey,
  list: () => [...userKeys.all, "list"] as QueryKey,
  detail: (id: string | number) => [...userKeys.all, "detail", id] as QueryKey,
};

export const syaratPengisianKrsKeys = {
  get: ["get-syarat-pengisian-krs"],
};
