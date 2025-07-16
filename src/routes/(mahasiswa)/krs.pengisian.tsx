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
import { TabelPenawaranKelasBatch } from "./-components/TabelPenawaranKelasBatch";
import { DataKrsSection } from "./-components/DataKrsSection";
TabelPenawaranKelasBatch;

export const Route = createFileRoute("/(mahasiswa)/krs/pengisian")({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) => {
    queryClient.prefetchQuery(syaratPengisianKrsOptions);
  },
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
                <DataKrsSection />
              </TabsContent>
            </Tabs>

            <div
              className="bg-white p-5 rounded-[5px] shadow flex flex-col"
              id="isi-krs"
            >
              <div className="w-full max-w-7xl rounded-lg shadow-md">
                <div className="overflow-x-auto">
                  <TabelPenawaranKelasBatch />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
