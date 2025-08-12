import { apiClient } from "@/lib/api-client";

type AMbilKelasResponseType = {
  ok: boolean;
};
export const ambilKelas = (classId: string) => {
  return apiClient<AMbilKelasResponseType>({
    url: "/krs/take",
    method: "POST",
    data: {
      classId,
    },
  });
};
