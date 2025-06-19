import { axiosInstance } from "@/lib/axios";

type GetSessionResponse = {
  status: string;
  data: {
    id_mahasiswa: string;
    nama: string;
    nim: string;
  };
};

export const getSessionData = async () => {
  const session = await axiosInstance.get<GetSessionResponse>("/auth/session");
  return session.data;
};
