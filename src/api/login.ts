// import axios from "axios";
// import { axiosInstance } from "@/lib/axios";
// import { AxiosNetworkError, AxiosResponseError } from "@/lib/errors";
import { apiClient } from "@/lib/api-client";

// type LoginResponse = {
//   status: number;
//   validation_errors: Record<string, string[]> | null;
//   message: string;
//   data: {
//     session_id: string;
//   } | null;
// };

// type SuccessfulLoginResponse = Omit<LoginResponse, "data"> & {
//   data: {
//     session_id: string;
//   };
// };

type LoginData = {
  session_id: string;
};
export const login = async (nim: string, password: string): Promise<LoginData> => {
  return apiClient<LoginData>({
    method: "POST",
    url: "auth/login",
    data: {
      username: nim.trim(),
      password,
    },
  });
  // try {
  //   const response = await axiosInstance.post<LoginResponse>("/auth/login", {
  //     username: nim,
  //     password,
  //   });

  //   // 1. Cek jika respons dari API secara logis adalah error (misal: gagal validasi)
  //   // API mungkin mengembalikan status 200 OK, tapi bodynya berisi pesan error.
  //   if (response.data.status >= 400 || !response.data.data) {
  //     throw new AxiosResponseError(response.data.message, response.data.validation_errors);
  //   }

  //   return response.data as SuccessfulLoginResponse;
  // } catch (error) {
  //   // 2. Cek jika ini adalah error dari Axios
  //   if (axios.isAxiosError(error)) {
  //     // Jika tidak ada 'response', berarti ini masalah jaringan (server tidak merespons)
  //     if (!error.response) {
  //       throw new AxiosNetworkError();
  //     }

  //     // Jika ada 'response', berarti server merespons dengan status error (4xx, 5xx)
  //     // Ini adalah fallback jika logika pengecekan di atas gagal
  //     const errorMessage = error.response.data?.message || "Terjadi kesalahan pada server.";
  //     const validationErrors = error.response.data?.validation_errors || null;
  //     throw new AxiosResponseError(errorMessage, validationErrors);
  //   }

  //   // 3. Untuk error yang tidak terduga (bukan dari Axios)
  //   throw new Error("Terjadi kesalahan yang tidak terduga.");
  // }
};
