import axios, { type AxiosRequestConfig } from "axios";
import { axiosInstance } from "@/lib/axios";
import { AxiosNetworkError, AxiosResponseError } from "@/lib/errors";

export interface ApiResponse<T> {
  status: number;
  message: string;
  validation_errors: Record<string, string[]> | null;
  data: T;
}

export const apiClient = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    // Gunakan .request() agar lebih generik daripada .post() atau .get()
    const response = await axiosInstance.request<ApiResponse<T>>(config);

    const apiResponse = response.data;

    if (apiResponse.status >= 400 || ((config.expectsData ?? true) && !apiResponse.data)) {
      throw new AxiosResponseError(apiResponse.message, apiResponse.validation_errors);
    }

    // Jika sukses, kita hanya kembalikan data intinya (payload)
    return apiResponse.data;
  } catch (error) {
    // Semua logika penanganan error Axios dan error tak terduga ada di sini
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        throw new AxiosNetworkError("Gagal terhubung ke server. Periksa koneksi internet Anda.");
      }

      const errorMessage = error.response.data?.message || "Terjadi kesalahan pada server.";
      const validationErrors = error.response.data?.validation_errors || null;
      throw new AxiosResponseError(errorMessage, validationErrors);
    }

    throw new Error("Terjadi kesalahan yang tidak terduga.");
  }
};
