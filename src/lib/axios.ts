import axios, { type InternalAxiosRequestConfig } from "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    /**
     * Jika true, apiClient akan melempar error jika `data` dari respons adalah null.
     * Setel ke false untuk aksi seperti logout atau delete.
     * @default true
     */
    expectsData?: boolean;
  }
}

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:1001",
  timeout: 10000,
  withCredentials: true,
  adapter: "fetch",
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig => {
    // 1. Dapatkan session_id dari localStorage pada setiap permintaan
    const sessionId = localStorage.getItem("session_id");

    // 2. Jika session_id ada, tambahkan ke header Authorization
    if (sessionId) {
      // Pastikan objek headers ada sebelum menambahkan properti
      if (!config.headers) {
        config.headers = {} as any;
      }
      config.headers.Authorization = `Bearer ${sessionId}`;
      // console.log("Authorization header added.");
    }

    // 3. Selalu kembalikan config agar permintaan dapat dilanjutkan
    return config;
  },
  (error) => {
    // Lakukan sesuatu jika ada error saat konfigurasi permintaan
    return Promise.reject(error);
  }
);
