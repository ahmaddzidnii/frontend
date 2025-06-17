import React from "react";

interface TabelListMataKuliahYangDiambilProps {
  mataKuliahyangDiambil: {
    id: string;
    kodeMataKuliah: string;
    kurikulumMataKuliah: string;
    nama: string;
    sks: number;
    kelas: string;
    jenis: string;
    jadwal: {
      hari: string;
      waktu: string;
      ruang: string;
    }[];
    dosenPengampu: {
      nama: string;
      nip: string;
    }[];
  }[];
}

export const TabelListMataKuliahYangDiambil = ({ mataKuliahyangDiambil }: TabelListMataKuliahYangDiambilProps) => {
  return (
    <div className="w-full max-w-7xl rounded-lg shadow-md">
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
                Dosen Pengampu
              </th>
            </tr>
          </thead>
          {/* Body Tabel */}
          <tbody>
            {mataKuliahyangDiambil.map((mataKuliah, i) => (
              <tr
                className="hover:bg-gray-50"
                key={mataKuliah.id}
              >
                {/* Nomor */}
                <td className="px-4 py-3 text-center align-top border border-gray-300">{i + 1}</td>
                {/* Mata Kuliah */}
                <td className="px-4 py-3 align-top border border-gray-300">
                  <div className="font-bold text-[#105E15]">{mataKuliah.kurikulumMataKuliah}</div>
                  <div className="text-gray-500">{mataKuliah.kodeMataKuliah}</div>
                  <div>{mataKuliah.nama}</div>
                </td>
                {/* SKS */}
                <td className="px-4 py-3 text-center align-top border border-gray-300">{mataKuliah.sks}</td>
                {/* Kelas */}
                <td className="px-4 py-3 text-center align-top border border-gray-300">{mataKuliah.kelas}</td>
                {/* Jenis */}
                <td className="px-4 py-3 align-top border border-gray-300">{mataKuliah.jenis}</td>
                {/* Jadwal */}
                <td className="px-4 py-3 align-top border border-gray-300">
                  {mataKuliah.jadwal.map((jadwal, index) => (
                    <React.Fragment key={index}>
                      <div>
                        {jadwal.hari}, {jadwal.waktu}
                      </div>
                      <div className="text-xs text-gray-500">Ruang : {jadwal.ruang}</div>
                    </React.Fragment>
                  ))}
                </td>
                {/* Dosen (Dikosongkan sesuai gambar) */}
                <td className="px-4 py-3 align-top border border-gray-300">
                  {mataKuliah.dosenPengampu.map((dosen, index) => (
                    <React.Fragment key={index}>
                      <div>{dosen.nama}</div>
                      <div className="text-xs text-gray-500">{dosen.nip}</div>
                    </React.Fragment>
                  ))}
                </td>
              </tr>
            ))}
            {/* Baris Data Mata Kuliah */}
          </tbody>
        </table>
      </div>
    </div>
  );
};
