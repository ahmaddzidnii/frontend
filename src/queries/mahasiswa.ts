import { queryOptions } from "@tanstack/react-query";

import { syaratPengisianKrsKeys } from "@/lib/query-keys";
import { getInformasiUmumMhs } from "@/api/get-informasi-umum-mhs";
import { getSyaratPengisianKrs } from "@/api/get-syarat-pengisisan-krs";

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
