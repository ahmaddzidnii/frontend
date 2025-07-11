export class AxiosNetworkError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "AxiosNetworkError";
    this.message = "Gagal terhubung ke server";
  }
}

/**
 * Error yang merepresentasikan respons error dari server (misal: status 4xx atau 5xx).
 * Dapat membawa data tambahan seperti validation_errors.
 */
export class AxiosResponseError<T = any> extends Error {
  public data: T | null;

  constructor(message: string, data: T | null = null) {
    super(message);
    this.name = "AxiosResponseError";
    this.data = data;
  }
}

export const getErrorMessage = (error: unknown): string => {
  // 1. Prioritaskan custom error kita yang pesannya sudah rapi
  if (error instanceof AxiosResponseError || error instanceof AxiosNetworkError) {
    return error.message;
  }

  // 2. Fallback untuk error JavaScript standar
  if (error instanceof Error) {
    // Ini akan menangkap pesan dari `new Error("...")` di service kita
    return error.message;
  }

  // 3. Fallback paling akhir untuk semua kasus lain (misal: throw "string")
  return "Terjadi kesalahan yang tidak diketahui. Silakan coba lagi.";
};
