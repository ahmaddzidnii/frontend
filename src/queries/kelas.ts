import { getDaftarPenawaranKelas } from "@/api/get-daftar-penawaran-kelas";
import { getStatusKoutaKelas, getStatusKoutaKelasBatch } from "@/api/get-status-kouta-kelas";
import { getKelasDiambilMhs } from "@/api/kelas/get-kelas-diambil-mhs";
import { queryOptions } from "@tanstack/react-query";

export const getDaftarPenawaranKelasOptions = queryOptions({
  queryKey: ["daftar-penawaran-kelas"],
  queryFn: getDaftarPenawaranKelas,
  staleTime: 1000 * 60 * 1, // 1 menit
});

export const getStatusKoutaKelasOptions = (id_kelas: string) =>
  queryOptions({
    queryKey: ["status-kouta-kelas", id_kelas],
    queryFn: () => getStatusKoutaKelas(id_kelas),
    staleTime: 1000 * 60 * 1,
    retry: 1,
  });

export const getStatusKoutaKelasBatchOptions = (id_kelas: string[]) =>
  queryOptions({
    queryKey: ["status-kouta-kelas", id_kelas],
    queryFn: () => getStatusKoutaKelasBatch(id_kelas),
    staleTime: 1000 * 60 * 1,
    retry: 1,
  });

export const getKelasDiambilMhsOptions = queryOptions({
  queryKey: ["kelas-diambil-mhs"],
  queryFn: getKelasDiambilMhs,
  staleTime: 1000 * 60 * 1,
  retry: 1,
});
