import { useState } from "react";
import { FaSync } from "react-icons/fa";
import { createFileRoute, Link } from "@tanstack/react-router";
import { FaExclamation, FaListCheck, FaPlus, FaTrash } from "react-icons/fa6";

import { Alert } from "@/components/Alert";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TableSyaratPengisianKrs } from "./-components/TableSyaratPengisianKrs";
import { InformasiUmumSection } from "./-components/InformasiUmumSection";
import { syaratPengisianKrsOptions } from "@/queries/mahasiswa";
// import { TablePenawaranKelas } from "./-components/TablePenawaranKelas";
import { TabelPenawaranKelasBatch } from "./-components/KomponenInduk";
TabelPenawaranKelasBatch;

export const Route = createFileRoute("/(mahasiswa)/krs/pengisian")({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) => {
    queryClient.prefetchQuery(syaratPengisianKrsOptions);
  },
  staleTime: Infinity,
});

function RouteComponent() {
  const [isKrsEnabled, setIsKrsEnabled] = useState(false);
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
                  <TableSyaratPengisianKrs onSyaratPengisisanKrsEnabled={setIsKrsEnabled} />
                </div>
              </div>
              {isKrsEnabled && (
                <Button
                  className="ms-auto "
                  asChild
                >
                  <Link
                    to="."
                    hash="isi-krs"
                  >
                    <FaListCheck />
                    Pengisian KRS
                  </Link>
                </Button>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {isKrsEnabled && (
          <>
            {/* Tabs Informasi */}
            <Tabs defaultValue="informasiUmum">
              <TabsList>
                <TabsTrigger value="informasiUmum">Informasi Umum</TabsTrigger>
                <TabsTrigger value="dataKrs">Data KRS</TabsTrigger>
              </TabsList>
              <TabsContent value="informasiUmum">
                <div className=" flex flex-col gap-5">
                  <InformasiUmumSection />
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

            <div
              className="bg-white p-5 rounded-[5px] shadow flex flex-col"
              id="isi-krs"
            >
              <div className="w-full max-w-7xl rounded-lg shadow-md">
                <div className="overflow-x-auto">
                  <TabelPenawaranKelasBatch />
                  {/* <TablePenawaranKelas /> */}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
