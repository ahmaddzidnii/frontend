import { axiosInstance } from "@/lib/axios";

export const logout = async (sessionId: string) => {
  const response = await axiosInstance.post("/auth/logout", undefined, {
    headers: {
      Authorization: `Bearer ${sessionId}`,
    },
  });

  return response.data;
};
