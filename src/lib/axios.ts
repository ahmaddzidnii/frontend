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

// Flag untuk mencegah infinite reload
let isReloading = false;

// Response interceptor untuk menangani 401 errors
axiosInstance.interceptors.response.use(
  (response) => {
    // Jika response sukses, langsung kembalikan
    return response;
  },
  (error) => {
    // Cek apakah error adalah 401 Unauthorized
    if (error.response?.status === 401 && !isReloading) {
      // Dapatkan URL dari request yang gagal
      const requestUrl = error.config?.url || "";

      // console.log(requestUrl, "Request URL yang gagal");

      // Cek apakah ini bukan endpoint get session
      // Sesuaikan dengan endpoint get session Anda
      const isGetSessionEndpoint = requestUrl.includes("/session") || requestUrl.includes("/auth/session") || requestUrl.includes("auth/login");

      if (!isGetSessionEndpoint) {
        // Set flag untuk mencegah multiple reload
        isReloading = true;

        // Hapus session_id dari localStorage
        localStorage.removeItem("session_id");

        // Optional: Tambahkan delay kecil untuk memastikan cleanup selesai
        setTimeout(() => {
          // Redirect ke halaman login atau reload
          window.location.href = "/login"; // Lebih baik daripada reload
          // atau gunakan window.location.reload() jika perlu
        }, 100);

        // Return rejected promise untuk menghentikan eksekusi lebih lanjut
        return Promise.reject(error);
      }
    }

    // Untuk error lain atau get session endpoint, lempar error seperti biasa
    return Promise.reject(error);
  }
);
