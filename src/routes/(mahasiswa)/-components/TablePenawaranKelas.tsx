import { Spinner } from "@/components/Spinner";
import { getDaftarPenawaranKelasOptions } from "@/queries/kelas";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { RowTablePenawaranKelas } from "./RowTablePenawaranKelas";

export const TablePenawaranKelas = () => {
  const { data: daftarPenawaranKelas, isError, isLoading } = useQuery(getDaftarPenawaranKelasOptions);

  if (isLoading)
    return (
      <div className="h-[347.15px] flex items-center justify-center">
        <Spinner />
      </div>
    );
  if (isError || !daftarPenawaranKelas) return <div className="h-[347.15px] flex items-center justify-center">Error loading data</div>;

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
        {Object.entries(daftarPenawaranKelas.semester_paket ?? {}).map(([semester, kelasList]) => (
          <React.Fragment key={semester}>
            <tr className="bg-gray-200">
              <td
                colSpan={9}
                className="px-4 py-2 text-center font-bold text-gray-700 border border-gray-300"
              >
                SEMESTER PAKET {semester}
              </td>
            </tr>

            {kelasList.map((kelas, index) => (
              <RowTablePenawaranKelas
                kelas={kelas}
                index={index}
                key={kelas.id_kelas}
              />
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

// export const TablePenawaranKelas = () => {
//   const { data: daftarPenawaranKelas, isError, isLoading } = useQuery(getDaftarPenawaranKelasOptions);
//   if (isLoading) {
//     return <div>Loading...</div>;
//   }
//   if (isError || !daftarPenawaranKelas) {
//     return <div>Error loading data</div>;
//   }

//   return (
//     <table className="w-full text-sm text-left text-gray-700 border-collapse">
//       {/* Header Tabel */}
//       <thead className="bg-gray-50">
//         <tr>
//           <th
//             scope="col"
//             className="px-4 py-3 font-semibold text-gray-600 uppercase w-16 text-center border border-gray-300"
//           >
//             No.
//           </th>
//           <th
//             scope="col"
//             className="px-4 py-3 font-semibold text-gray-600 uppercase border border-gray-300"
//           >
//             Mata Kuliah
//           </th>
//           <th
//             scope="col"
//             className="px-4 py-3 font-semibold text-gray-600 uppercase text-center border border-gray-300"
//           >
//             SKS
//           </th>
//           <th
//             scope="col"
//             className="px-4 py-3 font-semibold text-gray-600 uppercase text-center border border-gray-300"
//           >
//             Kelas
//           </th>
//           <th
//             scope="col"
//             className="px-4 py-3 font-semibold text-gray-600 uppercase border border-gray-300"
//           >
//             Jenis
//           </th>
//           <th
//             scope="col"
//             className="px-4 py-3 font-semibold text-gray-600 uppercase border border-gray-300"
//           >
//             Jadwal
//           </th>
//           <th
//             scope="col"
//             className="px-4 py-3 font-semibold text-gray-600 uppercase border border-gray-300"
//           >
//             Dosen
//           </th>
//           <th
//             scope="col"
//             className="px-4 py-3 font-semibold text-gray-600 uppercase border border-gray-300"
//           >
//             Terisi / Kuota
//           </th>
//           <th
//             scope="col"
//             className="px-4 py-3 font-semibold text-gray-600 uppercase text-center border border-gray-300"
//           >
//             Aksi
//           </th>
//         </tr>
//       </thead>
//       {/* Body Tabel */}
//       <tbody>
//         {/* Sub-header Semester */}
//         <tr className="bg-gray-200">
//           <td
//             colSpan={9}
//             className="px-4 py-2 text-center font-bold text-gray-700 border border-gray-300"
//           >
//             SEMESTER PAKET 2
//           </td>
//         </tr>
//         {/* Baris Data Mata Kuliah */}
//         <tr className="hover:bg-gray-50">
//           {/* Nomor */}
//           <td className="px-4 py-3 text-center align-top border border-gray-300">1</td>
//           {/* Mata Kuliah */}
//           <td className="px-4 py-3 align-top border border-gray-300">
//             <div className="font-bold text-[#105E15]">S2INF20</div>
//             <div className="text-gray-500">INF524108</div>
//             <div>Computer Vision</div>
//           </td>
//           {/* SKS */}
//           <td className="px-4 py-3 text-center align-top border border-gray-300">4</td>
//           {/* Kelas */}
//           <td className="px-4 py-3 text-center align-top border border-gray-300">A</td>
//           {/* Jenis */}
//           <td className="px-4 py-3 align-top border border-gray-300">PILIHAN</td>
//           {/* Jadwal */}
//           <td className="px-4 py-3 align-top border border-gray-300">
//             <div>Senin, 12:30 - 14:15</div>
//             <div className="text-xs text-gray-500">Ruang : FST-102</div>
//             <div className="mt-2">Kamis, 07:00 - 08:45</div>
//             <div className="text-xs text-gray-500">Ruang : FST-102</div>
//           </td>
//           {/* Dosen (Dikosongkan sesuai gambar) */}
//           <td className="px-4 py-3 align-top border border-gray-300">
//             <div>Gandewa Iswahyudi M.Kom</div>
//             <div className="text-xs text-gray-500">198609262015051001</div>
//             <div className="mt-2">Gandewa Iswahyuda M.Kom</div>
//             <div className="text-xs text-gray-500">198609262015051001</div>
//           </td>
//           {/* Terisi / Kuota */}
//           <td className="px-4 py-3 align-top border border-gray-300">27/30</td>
//           {/* Aksi */}
//           <td className="px-4 py-3 align-top border border-gray-300">
//             <div className="flex flex-col items-center space-y-2">
//               <Button>
//                 <FaPlus />
//               </Button>
//               <Button variant="reloadKouta">
//                 <FaSync />
//               </Button>
//             </div>
//           </td>
//         </tr>
//       </tbody>
//     </table>
//   );
// };
