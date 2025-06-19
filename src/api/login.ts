import { axiosInstance } from "@/lib/axios";

export const login = async (nim: string, password: string) => {
  const response = await axiosInstance.post("/auth/login", {
    username: nim,
    password,
  });

  return response.data;
};
