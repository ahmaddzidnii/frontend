import { Alert } from "@/components/Alert";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createFileRoute } from "@tanstack/react-router";
import { FaSync } from "react-icons/fa";
import { FaExclamation, FaPlus, FaTrash } from "react-icons/fa6";

export const Route = createFileRoute("/petugas/inputkelas")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <header className="bg-white shadow  w-full">
        <nav className="px-3 py-2.5 border-b-4 w-max border-b-[#105E15] ">
          <span className="text-xl">Input Kelas</span>
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

        {/* Tabs Informasi */}
        <Tabs defaultValue="daftarKelas">
          <TabsList>
            <TabsTrigger value="daftarKelas">Informasi Umum</TabsTrigger>
            <TabsTrigger value="dataKrs">Data KRS</TabsTrigger>
          </TabsList>
          <TabsContent value="daftarKelas">
            <div className=" flex flex-col gap-5">
              <select
                id="periodeAkademik"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Pilih Periode Akademik</option>
                <option value="4">Semester Ganjil 2025/2026</option>
                <option value="3">Semester Genap 2024/2025</option>
                <option value="2">Semester Ganjil 2024/2025</option>
                <option value="1">Semester Genap 2023/2024</option>
              </select>
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
      </div>
    </>
  );
}
