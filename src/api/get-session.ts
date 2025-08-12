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
  data: {
    session: {
      session_id: string;
    };
    user: {
      id: string;
      username: string;
      name: string;
      role: string;
    };
  };
};

export const getSessionData = async (): Promise<GetSessionResult> => {
  try {
    const session = await axiosInstance.get<RawSessionResponse>("/auth/session");
    return {
      id: session.data.data.user.id,
      name: session.data.data.user.name,
      nim: session.data.data.user.username,
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
