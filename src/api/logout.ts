import { axiosInstance } from "@/lib/axios";

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout", undefined, {});

  return response.data;
};
