import { createFileRoute } from "@tanstack/react-router";

import { Alert } from "@/components/Alert";
import { TabelInformasiUmum } from "@/components/tables/TabelInformasiUmum";
import { Button } from "@/components/ui/button";
import { FaSync } from "react-icons/fa";
import { FaExclamation, FaListCheck, FaPlus, FaTrash } from "react-icons/fa6";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/(apps)/krs/pengisian")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <header className="bg-white shadow  w-full">
        <nav className="px-3 py-2.5 border-b-4 w-max border-b-[#105E15] ">
          <span className="text-xl">Pengisian Kartu Rencana Studi</span>
        </nav>
      </header>

      <div className="shadow flex-1  p-10 flex flex-col gap-5 bg-[#ecedf1]">
        <Alert>
          <p>
            Jika mengalami error silahkan disampaikan melalui{" "}
            <a
              target="_blank"
              className="hover:underline font-bold text-[#105E15] italic"
              href="https://uinsk.id/AplikasiKRS"
            >
              https://uinsk.id/AplikasiKRS
            </a>
          </p>
        </Alert>

        {/* Syarat Pengisisan */}
        <Tabs defaultValue="syaratPengisian">
          <TabsList>
            <TabsTrigger value="syaratPengisian">Syarat Pengisian</TabsTrigger>
          </TabsList>
          <TabsContent value="syaratPengisian">
            <div className="flex flex-col">
              <div className="w-full max-w-4xl mx-auto p-4">
                <div className="overflow-x-auto">
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                    {/* Header Tabel */}
                    <thead>
                      <tr>
                        <th style={{ border: "1px solid #ddd", padding: 8, textAlign: "center" }}>No.</th>
                        <th style={{ border: "1px solid #ddd", padding: 8, textAlign: "center" }}>Syarat</th>
                        <th style={{ border: "1px solid #ddd", padding: 8, textAlign: "center" }}>Isi</th>
                        <th
                          style={{
                            border: "1px solid #ddd",
                            padding: 8,
                            textAlign: "center",
                          }}
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    {/* Body Tabel */}
                    <tbody>
                      {/* Baris 1 */}
                      <tr>
                        <td style={{ border: "1px solid #ddd", padding: 8, textAlign: "center" }}>1.</td>
                        <td style={{ border: "1px solid #ddd", padding: 8 }}>Bayar Biaya Pendidikan Genap Tahun Akademik 2023/2024 - Sudah Bayar</td>
                        <td style={{ border: "1px solid #ddd", padding: 8 }}>Sudah Bayar</td>
                        <td style={{ border: "1px solid #ddd", padding: 8 }}>
                          <svg
                            className="w-6 h-6 text-green-500 mx-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </td>
                      </tr>
                      {/* Baris 2 */}
                      <tr>
                        <td style={{ border: "1px solid #ddd", padding: 8, textAlign: "center" }}>2.</td>
                        <td style={{ border: "1px solid #ddd", padding: 8 }}>Semester Mahasiswa 3|4|5|6|7|8|9|10|11|12|13|14</td>
                        <td style={{ border: "1px solid #ddd", padding: 8 }}>5</td>
                        <td style={{ border: "1px solid #ddd", padding: 8 }}>
                          <svg
                            className="w-6 h-6 text-green-500 mx-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </td>
                      </tr>
                      {/* Baris 3 */}
                      <tr>
                        <td style={{ border: "1px solid #ddd", padding: 8, textAlign: "center" }}>3.</td>
                        <td style={{ border: "1px solid #ddd", padding: 8 }}>Status Mahasiswa - Aktif</td>
                        <td style={{ border: "1px solid #ddd", padding: 8 }}>Aktif</td>
                        <td style={{ border: "1px solid #ddd", padding: 8 }}>
                          <svg
                            className="w-6 h-6 text-green-500 mx-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <Button className="ms-auto ">
                <FaListCheck />
                Pengisian KRS
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Tabs Informasi */}
        <Tabs defaultValue="informasiUmum">
          <TabsList>
            <TabsTrigger value="informasiUmum">Informasi Umum</TabsTrigger>
            <TabsTrigger value="dataKrs">Data KRS</TabsTrigger>
          </TabsList>
          <TabsContent value="informasiUmum">
            {" "}
            <div className=" flex flex-col gap-5">
              <TabelInformasiUmum
                tahunAkademik="2025/2026"
                semester="SEMESTER GANJIL"
                ipk="4.00"
                sksKumulatif="34"
                ipsLalu="4.00"
                jatahSks="24"
                sksAmbil="0"
                sisaSks="24"
              />
              <Alert variant="info">
                <p>Apabila kouta penuh,mata kuliah tidak ada dan jadwal bentrok, silahkan hubungi Fakultas/Program Studi</p>
              </Alert>
              <Alert variant="info">
                <p>
                  Menu cetak KRS disediakan di &nbsp;
                  <a
                    className="text-[#105E15] font-semibold hover:underline"
                    href="https://akademik.uin-suka.ac.id"
                  >
                    SIA
                  </a>
                </p>
              </Alert>
              <div>
                <h2 className="font-bold mb-4">Keterangan :</h2>
                <ul className="grid grid-cols-4 ">
                  <li className="flex items-center justify-center gap-4">
                    <Button className="pointer-events-none [&_svg]:size-5">
                      <FaPlus />
                    </Button>
                    Ambil Kelas
                  </li>
                  <li className="flex items-center justify-center gap-4">
                    <Button
                      variant="destructive"
                      className="pointer-events-none [&_svg]:size-5"
                    >
                      <FaTrash />
                    </Button>
                    Hapus Kelas
                  </li>
                  <li className="flex items-center justify-center gap-4">
                    <Button
                      variant="reloadKouta"
                      className="pointer-events-none [&_svg]:size-5"
                    >
                      <FaSync />
                    </Button>
                    Reload Kouta
                  </li>
                  <li className="flex items-center justify-center gap-4">
                    <Button
                      variant="kelasPenuh"
                      className="pointer-events-none [&_svg]:size-5"
                    >
                      <FaExclamation />
                    </Button>
                    Kelas Penuh
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="dataKrs">
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
                    {/* Baris Data Mata Kuliah */}
                    <tr className="hover:bg-gray-50">
                      {/* Nomor */}
                      <td className="px-4 py-3 text-center align-top border border-gray-300">1</td>
                      {/* Mata Kuliah */}
                      <td className="px-4 py-3 align-top border border-gray-300">
                        <div className="font-bold text-[#105E15]">S2INF20</div>
                        <div className="text-gray-500">INF524108</div>
                        <div>Computer Vision</div>
                      </td>
                      {/* SKS */}
                      <td className="px-4 py-3 text-center align-top border border-gray-300">4</td>
                      {/* Kelas */}
                      <td className="px-4 py-3 text-center align-top border border-gray-300">A</td>
                      {/* Jenis */}
                      <td className="px-4 py-3 align-top border border-gray-300">PILIHAN</td>
                      {/* Jadwal */}
                      <td className="px-4 py-3 align-top border border-gray-300">
                        <div>Senin, 12:30 - 14:15</div>
                        <div className="text-xs text-gray-500">Ruang : FST-102</div>
                        <div className="mt-2">Kamis, 07:00 - 08:45</div>
                        <div className="text-xs text-gray-500">Ruang : FST-102</div>
                      </td>
                      {/* Dosen (Dikosongkan sesuai gambar) */}
                      <td className="px-4 py-3 align-top border border-gray-300">
                        <div>Gandewa Iswahyudi M.Kom</div>
                        <div className="text-xs text-gray-500">198609262015051001</div>
                        <div className="mt-2">Gandewa Iswahyuda M.Kom</div>
                        <div className="text-xs text-gray-500">198609262015051001</div>
                      </td>

                      {/* Aksi */}
                      <td className="px-4 py-3 align-top border border-gray-300">
                        <div className="flex flex-col items-center space-y-2">
                          <Button>
                            <FaPlus />
                          </Button>
                          <Button variant="reloadKouta">
                            <FaSync />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-white p-5 rounded-[5px] shadow flex flex-col">
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
                      Dosen
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 font-semibold text-gray-600 uppercase border border-gray-300"
                    >
                      Terisi / Kuota
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
                  {/* Sub-header Semester */}
                  <tr className="bg-gray-200">
                    <td
                      colSpan={9}
                      className="px-4 py-2 text-center font-bold text-gray-700 border border-gray-300"
                    >
                      SEMESTER PAKET 2
                    </td>
                  </tr>
                  {/* Baris Data Mata Kuliah */}
                  <tr className="hover:bg-gray-50">
                    {/* Nomor */}
                    <td className="px-4 py-3 text-center align-top border border-gray-300">1</td>
                    {/* Mata Kuliah */}
                    <td className="px-4 py-3 align-top border border-gray-300">
                      <div className="font-bold text-[#105E15]">S2INF20</div>
                      <div className="text-gray-500">INF524108</div>
                      <div>Computer Vision</div>
                    </td>
                    {/* SKS */}
                    <td className="px-4 py-3 text-center align-top border border-gray-300">4</td>
                    {/* Kelas */}
                    <td className="px-4 py-3 text-center align-top border border-gray-300">A</td>
                    {/* Jenis */}
                    <td className="px-4 py-3 align-top border border-gray-300">PILIHAN</td>
                    {/* Jadwal */}
                    <td className="px-4 py-3 align-top border border-gray-300">
                      <div>Senin, 12:30 - 14:15</div>
                      <div className="text-xs text-gray-500">Ruang : FST-102</div>
                      <div className="mt-2">Kamis, 07:00 - 08:45</div>
                      <div className="text-xs text-gray-500">Ruang : FST-102</div>
                    </td>
                    {/* Dosen (Dikosongkan sesuai gambar) */}
                    <td className="px-4 py-3 align-top border border-gray-300">
                      <div>Gandewa Iswahyudi M.Kom</div>
                      <div className="text-xs text-gray-500">198609262015051001</div>
                      <div className="mt-2">Gandewa Iswahyuda M.Kom</div>
                      <div className="text-xs text-gray-500">198609262015051001</div>
                    </td>
                    {/* Terisi / Kuota */}
                    <td className="px-4 py-3 align-top border border-gray-300">27/30</td>
                    {/* Aksi */}
                    <td className="px-4 py-3 align-top border border-gray-300">
                      <div className="flex flex-col items-center space-y-2">
                        <Button>
                          <FaPlus />
                        </Button>
                        <Button variant="reloadKouta">
                          <FaSync />
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
