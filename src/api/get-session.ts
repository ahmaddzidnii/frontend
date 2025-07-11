import axios from "axios";

import { axiosInstance } from "@/lib/axios";

type GetSessionSuccess = {
  id: string;
  name: string;
  nim: string;
};

export type GetSessionError = {
  error_code: string;
};

export type GetSessionResult = GetSessionSuccess | GetSessionError | null;

type RawSessionResponse = {
  status: number;
  validation_errors: any;
  message: string;
  data: {
    user_id: string;
    nomor_induk: string;
    nama: string;
    role: {
      id_role: string;
      role_name: string;
    };
  };
};

export const getSessionData = async (): Promise<GetSessionResult> => {
  try {
    const session = await axiosInstance.get<RawSessionResponse>("/auth/session");
    return {
      id: session.data.data.user_id,
      name: session.data.data.nama,
      nim: session.data.data.nomor_induk,
    };
  } catch (error: any) {
    console.error(error);

    if (axios.isAxiosError(error) && error.response?.status === 403) {
      return {
        error_code: error.response.data.error_code,
      };
    }

    return null;
  }
};
