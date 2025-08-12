import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/Spinner";
import { getDaftarPenawaranKelasOptions } from "@/queries/kelas";
import { RowTablePenawaranKelas, type BatchStatusResponse } from "./RowTablePenawaranKelas";
import { getStatusKoutaKelasBatch } from "@/api/get-status-kouta-kelas";

type MutationVariables = {
  id_kelas_list: string[];
};

export const TabelPenawaranKelasBatch = () => {
  // State untuk menyimpan status (kuota, dll.) per kelas
  const [statuses, setStatuses] = useState<BatchStatusResponse>({});
  // State untuk melacak baris mana yang sedang di-refresh secara individual
  const [isRefetching, setIsRefetching] = useState<string[]>([]);
  // State untuk menyimpan pesan error per baris
  const [rowErrors, setRowErrors] = useState<{ [key: string]: string }>({});

  const { data: daftarPenawaranKelas, isError, isLoading } = useQuery(getDaftarPenawaranKelasOptions);

  const { mutate: batchRefreshKouta } = useMutation<BatchStatusResponse, Error, MutationVariables>({
    mutationFn: (data) => getStatusKoutaKelasBatch(data.id_kelas_list),
    onMutate: (variables) => {
      // Tandai baris yang relevan sebagai 'sedang me-refresh'
      setIsRefetching((prev) => [...new Set([...prev, ...variables.id_kelas_list])]);
      // Hapus error lama untuk baris yang akan di-refresh
      setRowErrors((prev) => {
        const newErrors = { ...prev };
        variables.id_kelas_list.forEach((id) => delete newErrors[id]);
        return newErrors;
      });
    },
    onSuccess: (data) => {
      // Jika berhasil, perbarui state statuses dengan data baru
      setStatuses((prev) => ({ ...prev, ...data }));
    },
    onError: (error: Error, variables) => {
      // Jika gagal, simpan pesan error untuk setiap baris yang gagal
      setRowErrors((prev) => {
        const newErrors = { ...prev };
        variables.id_kelas_list.forEach((id) => (newErrors[id] = error.message));
        return newErrors;
      });
    },
    onSettled: (_data, _error, variables) => {
      // Setelah selesai (baik sukses atau error), hapus dari daftar 'sedang me-refresh'
      setIsRefetching((prev) => prev.filter((id) => !variables.id_kelas_list.includes(id)));
    },
  });

  useEffect(() => {
    if (daftarPenawaranKelas?.semester_paket) {
      const allIds = Object.values(daftarPenawaranKelas.semester_paket)
        .flat()
        .map((k) => k.id_kelas);

      if (allIds.length > 0) {
        batchRefreshKouta({ id_kelas_list: allIds });
      }
    }
  }, [daftarPenawaranKelas, batchRefreshKouta]);

  const handleRefetchRow = (id_kelas: string) => {
    batchRefreshKouta({ id_kelas_list: [id_kelas] });
  };

  if (isLoading) {
    return (
      <div className="h-[347.15px] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError || !daftarPenawaranKelas) {
    return <div className="h-[347.15px] flex items-center justify-center">Error loading data</div>;
  }

  // Handle ketika tidak ada data semester_paket sama sekali
  if (!daftarPenawaranKelas.semester_paket || Object.keys(daftarPenawaranKelas.semester_paket).length === 0) {
    return (
      <div className="h-[347.15px] flex items-center justify-center">
        <div className="text-center">
          <div className="font-medium">Tidak ada penawaran kelas tersedia</div>
          <div className="text-sm mt-1">Silakan coba lagi nanti atau hubungi administrator</div>
        </div>
      </div>
    );
  }

  return (
    <table className="w-full text-sm text-left text-gray-700 border-collapse">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-3 font-semibold text-gray-600 uppercase w-16 text-center border border-gray-300">No.</th>
          <th className="px-4 py-3 font-semibold text-gray-600 uppercase border border-gray-300">Mata Kuliah</th>
          <th className="px-4 py-3 font-semibold text-gray-600 uppercase text-center border border-gray-300">SKS</th>
          <th className="px-4 py-3 font-semibold text-gray-600 uppercase text-center border border-gray-300">Kelas</th>
          <th className="px-4 py-3 font-semibold text-gray-600 uppercase border border-gray-300">Jenis</th>
          <th className="px-4 py-3 font-semibold text-gray-600 uppercase border border-gray-300">Jadwal</th>
          <th className="px-4 py-3 font-semibold text-gray-600 uppercase border border-gray-300">Dosen</th>
          <th className="px-4 py-3 font-semibold text-gray-600 uppercase border border-gray-300">Terisi / Kuota</th>
          <th className="px-4 py-3 font-semibold text-gray-600 uppercase text-center border border-gray-300">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(daftarPenawaranKelas.semester_paket).map(([semester, kelasList]) => (
          <React.Fragment key={semester}>
            <tr className="bg-gray-200">
              <td
                colSpan={9}
                className="px-4 py-2 text-center font-bold text-gray-700 border border-gray-300"
              >
                SEMESTER PAKET {semester}
              </td>
            </tr>
            {kelasList.length > 0 ? (
              kelasList.map((kelas, index) => (
                <RowTablePenawaranKelas
                  key={kelas.id_kelas}
                  kelas={kelas}
                  index={index}
                  statusKouta={statuses[kelas.id_kelas]}
                  isRowLoading={isRefetching.includes(kelas.id_kelas)}
                  rowError={rowErrors[kelas.id_kelas] || null}
                  onRefetch={handleRefetchRow}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={9}
                  className="px-4 py-2 text-center text-gray-500 border border-gray-300"
                >
                  Tidak ada kelas yang tersedia untuk semester ini.
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};
