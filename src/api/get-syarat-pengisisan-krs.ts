import { apiClient } from "@/lib/api-client";

type SyaratKrsType = {
  judul: string;
  data_syarat: {
    syarat: string;
    isi: string;
    status: boolean;
  }[];
  pengisisan_krs_enabled: boolean;
};
export const getSyaratPengisianKrs = () => {
  return apiClient<SyaratKrsType>({
    url: "/krs/requirements",
    method: "GET",
  });
};
