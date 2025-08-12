import { apiClient } from "@/lib/api-client";

type HapusKelasResponseType = {
  ok: boolean;
};
export const hapusKelas = (classId: string) => {
  return apiClient<HapusKelasResponseType>({
    url: "/krs/remove",
    method: "POST",
    data: {
      classId,
    },
  });
};
