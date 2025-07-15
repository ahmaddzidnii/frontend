import { FaSync } from "react-icons/fa";
import { FaExclamation, FaPlus, FaTrash } from "react-icons/fa6";
import { MdWarningAmber } from "react-icons/md";

import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { useConfirmation } from "@/hooks/useConfirmDialog";
import { getPesanBerhasilAmbilKrs, getPesanGagalAmbilKrs, getPesanKonfirmasiAmbilKRS } from "@/utils/get-pesan-konfirmasi-ambil-krs";
import { useMutation } from "@tanstack/react-query";
import { useAlertDialog } from "@/hooks/useAlertDialog";

export interface BatchStatus {
  terisi: number;
  kouta: number;
  is_full: boolean;
  is_joined: boolean;
}

export interface BatchStatusResponse {
  [key: string]: BatchStatus;
}

interface RowTablePenawaranKelasProps {
  kelas: {
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
    jadwal: {
      hari: string;
      waktu_mulai: string;
      waktu_selesai: string;
      ruangan: string;
    }[];
  };
  index: number;
  statusKouta?: BatchStatus;
  isRowLoading: boolean;
  rowError: string | null;
  onRefetch: (id_kelas: string) => void;
}

export const RowTablePenawaranKelas = ({ kelas, index, statusKouta, isRowLoading, rowError, onRefetch }: RowTablePenawaranKelasProps) => {
  const { confirm } = useConfirmation();
  const { showAlert } = useAlertDialog();

  const { mutateAsync } = useMutation({
    mutationFn: async (id_kelas: string) => {
      const randomBool = Math.random() > 0.5;
      // Simulate an API call to fetch kouta status
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (randomBool) {
            resolve(id_kelas);
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
        message: getPesanBerhasilAmbilKrs(kelas.nama_mata_kuliah, kelas.nama_kelas),
      });
    },
    onError: (error) => {
      console.log(error);
      showAlert({
        variant: "error",
        message: getPesanGagalAmbilKrs(kelas.nama_mata_kuliah, kelas.nama_kelas),
      });
    },
  });

  const handleReloadKouta = () => {
    if (!isRowLoading) {
      onRefetch(kelas.id_kelas);
    }
  };

  const handleTambahKelas = async () => {
    const ok = await confirm({
      message: getPesanKonfirmasiAmbilKRS(kelas.nama_mata_kuliah, kelas.nama_kelas),
      confirmText: "Ya",
      type: "info",
      onConfirm() {
        return mutateAsync(kelas.id_kelas);
      },
    });

    if (!ok) return;
  };

  const handleHapusKelas = async () => {
    const ok = await confirm({
      message: `Apakah Anda yakin ingin menghapus kelas ${kelas.nama_mata_kuliah} - ${kelas.nama_kelas}?`,
      confirmText: "Ya",
      cancelText: "Batal",
      type: "warning",
      onConfirm() {
        // Simulate API call to delete class
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(true);
          }, 1000);
        });
      },
    });

    if (ok) {
      showAlert({
        variant: "success",
        message: getPesanBerhasilAmbilKrs(kelas.nama_mata_kuliah, kelas.nama_kelas),
      });
    }
  };

  return (
    <tr
      key={kelas.id_kelas}
      className={`hover:bg-gray-50`}
    >
      <td className="px-4 py-3 text-center align-top border border-gray-300">{index + 1}</td>
      <td className="px-4 py-3 align-top border border-gray-300">
        <div className="font-bold text-[#105E15]">{kelas.kode_kurikulum}</div>
        <div className="text-gray-500">{kelas.kode_mata_kuliah}</div>
        <div>{kelas.nama_mata_kuliah}</div>
      </td>
      <td className="px-4 py-3 text-center align-top border border-gray-300">{kelas.sks}</td>
      <td className="px-4 py-3 text-center align-top border border-gray-300">{kelas.nama_kelas}</td>
      <td className="px-4 py-3 align-top border border-gray-300 uppercase">{kelas.jenis_mata_kuliah}</td>
      <td className="px-4 py-3 align-top border border-gray-300">
        {kelas.jadwal.length === 0 && <div className="flex items-center justify-center">-</div>}
        {kelas.jadwal.map((j, idx) => (
          <div
            key={idx}
            className={kelas.jadwal.length > 1 && idx !== kelas.jadwal.length - 1 ? "mb-5" : ""}
          >
            <div>
              {j.hari}, {j.waktu_mulai} - {j.waktu_selesai}
            </div>
            <div className=" text-gray-500">
              Ruang: <span className="font-semibold">{j.ruangan}</span>
            </div>
          </div>
        ))}
      </td>
      <td className="px-4 py-3 align-top border border-gray-300">
        {kelas.dosen_pengajar.length === 0 && <div className="flex items-center justify-center">-</div>}
        {kelas.dosen_pengajar.map((dosen, idx) => (
          <div
            key={idx}
            className={kelas.dosen_pengajar.length > 1 && idx !== kelas.dosen_pengajar.length - 1 ? "mb-5" : ""}
          >
            <div>{dosen.nama_dosen}</div>
          </div>
        ))}
      </td>
      <td className="px-4 py-3 align-top border border-gray-300">
        <div className="flex items-center justify-center">
          {isRowLoading ? (
            <Spinner />
          ) : rowError ? (
            <MdWarningAmber className="size-5 text-rose-500" />
          ) : statusKouta ? (
            <span>
              {statusKouta.terisi}/{statusKouta.kouta}
            </span>
          ) : (
            <span className="text-gray-400">-/-</span>
          )}
        </div>
      </td>

      <td className="px-4 py-3 align-top border border-gray-300">
        <div className="flex flex-col items-center space-y-2">
          {statusKouta && !isRowLoading && !rowError ? (
            statusKouta.is_full ? (
              <Button
                variant="kelasPenuh"
                className="pointer-events-none [&_svg]:size-5"
              >
                <FaExclamation />
              </Button>
            ) : statusKouta.is_joined ? (
              <Button
                variant="destructive"
                className="[&_svg]:size-5"
                onClick={handleHapusKelas}
              >
                <FaTrash />
              </Button>
            ) : (
              <Button
                onClick={handleTambahKelas}
                className="[&_svg]:size-5"
              >
                <FaPlus />
              </Button>
            )
          ) : (
            <div className="animate-pulse bg-slate-300 w-10 h-9 rounded-lg" />
          )}
          <Button
            variant="reloadKouta"
            onClick={handleReloadKouta}
            disabled={isRowLoading}
          >
            <FaSync className={isRowLoading ? "animate-spin" : ""} />
          </Button>
        </div>
      </td>
    </tr>
  );
};
