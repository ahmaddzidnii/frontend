import { useQuery } from "@tanstack/react-query";
import { FaSync } from "react-icons/fa";
import { FaExclamation, FaPlus, FaTrash } from "react-icons/fa6";
import { MdWarningAmber } from "react-icons/md";

import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { getStatusKoutaKelasOptions } from "@/queries/kelas";

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
}

export const RowTablePenawaranKelas = ({ kelas, index }: RowTablePenawaranKelasProps) => {
  const { data: statusKouta, isLoading, isFetching, isError, refetch } = useQuery(getStatusKoutaKelasOptions(kelas.id_kelas));

  const handleReloadKouta = () => {
    const curretlyFecthing = isLoading || isFetching;
    if (!curretlyFecthing) {
      refetch();
    }
  };
  return (
    <tr
      key={kelas.id_kelas}
      className="hover:bg-gray-50"
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
        {kelas.jadwal.map((j, idx) => (
          <div
            key={idx}
            className="mb-5"
          >
            <div>
              {j.hari}, {j.waktu_mulai} - {j.waktu_selesai}
            </div>
            <div>
              Ruang: <span className="font-semibold">{j.ruangan}</span>
            </div>
          </div>
        ))}
      </td>
      <td className="px-4 py-3 align-top border border-gray-300">
        {kelas.dosen_pengajar.map((dosen, idx) => (
          <div
            key={idx}
            className="mb-5"
          >
            <div>{dosen.nama_dosen}</div>
          </div>
        ))}
      </td>
      <td className="px-4 py-3 align-top  border border-gray-300">
        <div className="flex items-center flex-col">
          {isLoading || isFetching ? (
            <Spinner />
          ) : isError || !statusKouta ? (
            <MdWarningAmber className="size-5 text-rose-500" />
          ) : (
            <span>
              {statusKouta.terisi}/{statusKouta.kouta}
            </span>
          )}
        </div>
      </td>

      <td className="px-4 py-3 align-top border border-gray-300">
        <div className="flex flex-col items-center space-y-2">
          {statusKouta ? (
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
              >
                <FaTrash />
              </Button>
            ) : (
              <Button>
                <FaPlus />
              </Button>
            )
          ) : (
            <Button>
              <FaPlus />
            </Button>
          )}
          <Button
            variant="reloadKouta"
            onClick={handleReloadKouta}
          >
            <FaSync />
          </Button>
        </div>
      </td>
    </tr>
  );
};
