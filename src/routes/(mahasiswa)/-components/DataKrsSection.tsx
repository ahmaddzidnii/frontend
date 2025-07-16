import { FaTrash } from "react-icons/fa6";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { useAlertDialog } from "@/hooks/useAlertDialog";
import { useConfirmation } from "@/hooks/useConfirmDialog";
import { getKelasDiambilMhsOptions } from "@/queries/kelas";
import { getPesanBerhasilHapusKrs, getPesanGagalHapusKrs, getPesanKonfirmasiHapusKRS } from "@/utils/get-pesan-konfirmasi-ambil-krs";

const DeleteButtonAction = ({ id_kelas, nama_mata_kuliah, nama_kelas }: { id_kelas: string; nama_mata_kuliah: string; nama_kelas: string }) => {
  const { confirm } = useConfirmation();
  const { showAlert } = useAlertDialog();
  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      const randomBool = Math.random() > 0.5;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (randomBool) {
            resolve({
              id_kelas,
              nama_kelas,
              nama_mata_kuliah,
            });
          } else {
            reject(new Error("MAAF, DATA MATA KULIAH SUDAH ADA DI ISIAN KRS"));
          }
        }, 1000);
      });
    },
    onSuccess: (data) => {
      console.log("Kouta status fetched:", data);
      showAlert({
        variant: "success",
        message: getPesanBerhasilHapusKrs(nama_mata_kuliah, nama_kelas),
      });
    },
    onError: (error) => {
      console.log(error);
      showAlert({
        variant: "error",
        message: getPesanGagalHapusKrs(nama_mata_kuliah, nama_kelas),
      });
    },
  });

  const handleHapusKelas = async (nama_mata_kuliah: string, nama_kelas: string) => {
    await confirm({
      message: getPesanKonfirmasiHapusKRS(nama_mata_kuliah, nama_kelas),
      confirmText: "Ya",
      cancelText: "Batal",
      type: "warning",
      onConfirm() {
        return mutateAsync();
      },
    });
  };

  return (
    <Button
      variant="destructive"
      className="[&_svg]:size-5"
      onClick={() => handleHapusKelas(nama_mata_kuliah, nama_kelas)}
    >
      <FaTrash />
    </Button>
  );
};

export const DataKrsSection = () => {
  const { data: dataKrs, isLoading, isError } = useQuery(getKelasDiambilMhsOptions);

  if (isLoading) {
    return (
      <div className="h-[347.15px] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError || !dataKrs) {
    return <div className="h-[347.15px] flex items-center justify-center">Error loading data</div>;
  }

  return (
    <div className="w-full max-w-7xl rounded-lg ">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700 border-collapse">
          {/* Header Tabel */}
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 font-semibold text-gray-600 uppercase w-16 text-center border border-gray-300"
              >
                No.
              </th>
              <th
                scope="col"
                className="px-4 py-3 font-semibold text-gray-600 uppercase border border-gray-300"
              >
                Mata Kuliah
              </th>
              <th
                scope="col"
                className="px-4 py-3 font-semibold text-gray-600 uppercase text-center border border-gray-300"
              >
                SKS
              </th>
              <th
                scope="col"
                className="px-4 py-3 font-semibold text-gray-600 uppercase text-center border border-gray-300"
              >
                Kelas
              </th>
              <th
                scope="col"
                className="px-4 py-3 font-semibold text-gray-600 uppercase border border-gray-300"
              >
                Jenis
              </th>
              <th
                scope="col"
                className="px-4 py-3 font-semibold text-gray-600 uppercase border border-gray-300"
              >
                Jadwal
              </th>
              <th
                scope="col"
                className="px-4 py-3 font-semibold text-gray-600 uppercase border border-gray-300"
              >
                Dosen
              </th>

              <th
                scope="col"
                className="px-4 py-3 font-semibold text-gray-600 uppercase text-center border border-gray-300"
              >
                Aksi
              </th>
            </tr>
          </thead>
          {/* Body Tabel */}
          <tbody>
            {dataKrs.length > 0 ? (
              dataKrs.map((k, idx) => (
                <tr
                  key={k.id_kelas}
                  className="hover:bg-gray-50"
                >
                  {/* Nomor */}
                  <td className="px-4 py-3 text-center align-top border border-gray-300">{idx + 1}</td>
                  {/* Mata Kuliah */}
                  <td className="px-4 py-3 align-top border border-gray-300">
                    <div className="font-bold text-[#105E15]">{k.kode_kurikulum}</div>
                    <div className="text-gray-500">{k.kode_mata_kuliah}</div>
                    <div>{k.nama_mata_kuliah}</div>
                  </td>
                  {/* SKS */}
                  <td className="px-4 py-3 text-center align-top border border-gray-300">{k.sks}</td>
                  {/* Kelas */}
                  <td className="px-4 py-3 text-center align-top border border-gray-300">{k.nama_kelas}</td>
                  {/* Jenis */}
                  <td className="px-4 py-3 align-top border border-gray-300 uppercase">{k.jenis_mata_kuliah}</td>
                  {/* Jadwal */}
                  <td className="px-4 py-3 align-top border border-gray-300">
                    {k.jadwal.length > 0 ? (
                      k.jadwal.map((j, idx) => (
                        <div
                          className="mb-5"
                          key={idx}
                        >
                          <div>
                            {j.hari}, {j.waktu_mulai} - {j.waktu_selesai}
                          </div>
                          <div className="text-xs text-gray-500">Ruang : {j.ruangan}</div>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center justify-center">-</div>
                    )}
                  </td>
                  <td className="px-4 py-3 align-top border border-gray-300">
                    {k.dosen_pengajar.length > 0 ? (
                      k.dosen_pengajar.map((d) => (
                        <div
                          className="mb-5"
                          key={d.nip_dosen}
                        >
                          {d.nama_dosen}
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center justify-center">-</div>
                    )}
                  </td>

                  {/* Aksi */}
                  <td className="px-4 py-3 align-top border border-gray-300">
                    <div className="flex flex-col items-center space-y-2">
                      <DeleteButtonAction
                        id_kelas={k.id_kelas}
                        nama_kelas={k.nama_kelas}
                        nama_mata_kuliah={k.nama_mata_kuliah}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  align="center"
                  className="h-[100px] text-base border"
                >
                  Tidak ada kelas yang anda ambil
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
