import { apiClient } from "@/lib/api-client";

type StatusKoutaKelas = {
  id_kelas: string;
  terisi: number;
  kuota: number;
  is_full: boolean;
  is_joined: boolean;
};

type BatchStatusResponse = {
  [id_kelas: string]: StatusKoutaKelas;
};

export const getStatusKoutaKelas = async (id_kelas: string) => {
  return apiClient<StatusKoutaKelas>({
    url: "/mahasiswa/status-kouta-kelas",
    method: "POST",
    data: {
      id_kelas,
    },
  });
};

export const getStatusKoutaKelasBatch = async (id_kelas: string[]) => {
  return apiClient<BatchStatusResponse>({
    url: "/schedules/get-class-status-batch",
    method: "POST",
    data: {
      classIds: id_kelas,
    },
  });
};
