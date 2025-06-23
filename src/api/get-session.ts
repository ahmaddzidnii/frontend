import { axiosInstance } from "@/lib/axios";

type GetSessionResponse = {
  status: string;
  data: {
    user_id: string;
    nama: string;
    nim: string;
  };
};

export const getSessionData = async () => {
  try {
    const session = await axiosInstance.get<GetSessionResponse>("/auth/session", {});
    return {
      id: session.data.data.user_id,
      name: session.data.data.nama,
      nim: session.data.data.nim,
    };
  } catch (error) {
    return null;
  }
};
