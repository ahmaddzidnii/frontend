import { apiClient } from "@/lib/api-client";

type InformasiUmumMhsType = {
  tahun_akademik: string;
  semester: string;
  ipk: number;
  sks_kumulatif: number;
  ips_lalu: number;
  jatah_sks: number;
  sks_ambil: number;
  sisa_sks: number;
};

export const getInformasiUmumMhs = async () => {
  return apiClient<InformasiUmumMhsType>({
    url: "mahasiswa/informasi-umum",
    method: "GET",
  });
};
