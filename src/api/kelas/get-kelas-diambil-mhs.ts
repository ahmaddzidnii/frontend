import { apiClient } from "@/lib/api-client";

type DaftarKelasDiambilType = {
  id_kelas: string;
  kode_mata_kuliah: string;
  kode_kurikulum: string;
  nama_mata_kuliah: string;
  jenis_mata_kuliah: string;
  sks: number;
  semester_paket: number;
  nama_kelas: string;
  dosen_pengajar: {
    nip_dosen: string;
    nama_dosen: string;
  }[];
  jadwal: { hari: string; waktu_mulai: string; waktu_selesai: string; ruangan: string }[];
}[];

export const getKelasDiambilMhs = () => {
  return apiClient<DaftarKelasDiambilType>({
    url: "krs/kelas-diambil",
    method: "GET",
  });
};
