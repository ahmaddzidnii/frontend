import { apiClient } from "@/lib/api-client";

type StatusKoutaKelas = {
  id_kelas: string;
  terisi: number;
  kouta: number;
  is_full: boolean;
  is_joined: boolean;
};

type BatchStatusResponse = {
  [id_kelas: string]: StatusKoutaKelas;
};

export const getStatusKoutaKelas = async (id_kelas: string) => {
  return apiClient<StatusKoutaKelas>({
    url: "mahasiswa/status-kouta-kelas",
    method: "POST",
    data: {
      id_kelas,
    },
  });
};

export const getStatusKoutaKelasBatch = async (id_kelas: string[]) => {
  await new Promise((resolve) => setTimeout(resolve, 10000)); // Simulate delay for batch processing
  return apiClient<BatchStatusResponse>({
    url: "mahasiswa/status-kouta-kelas-batch",
    method: "POST",
    data: {
      id_kelas,
    },
  });
};
