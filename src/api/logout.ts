import { apiClient } from "@/lib/api-client";

export const logout = async () => {
  return apiClient<any>({
    method: "POST",
    url: "auth/logout",
    expectsData: false,
  });
};
