import { axiosInstance } from "@/lib/axios";

type LoginResponse = {
  data: {
    data: {
      session_id: string;
    };
  };
};

export const login = async (nim: string, password: string) => {
  const response = await axiosInstance.post<any, LoginResponse>("/auth/login", {
    username: nim,
    password,
  });

  return response.data;
};
