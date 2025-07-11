import { queryOptions } from "@tanstack/react-query";
import { getInformasiUmumMhs } from "@/api/get-informasi-umum-mhs";
import { syaratPengisianKrsKeys } from "@/lib/query-keys";
import { getSyaratPengisianKrs } from "@/api/get-syarat-pengisisan-krs";

/**
 * Menggunakan `queryOptions` dari TanStack Query v5+ adalah cara modern dan
 * paling direkomendasikan untuk membuat konfigurasi yang type-safe dan reusable.
 */

export const informasiUmumMhsOptions = queryOptions({
  queryKey: ["informasi-umum-mhs"],
  queryFn: getInformasiUmumMhs,
  staleTime: 1000 * 60 * 1, // 1 menit
});

export const syaratPengisianKrsOptions = queryOptions({
  queryKey: syaratPengisianKrsKeys["get"],
  queryFn: getSyaratPengisianKrs,
  staleTime: 1000 * 60,
});
