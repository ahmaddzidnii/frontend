import { useState, useCallback, memo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { FaSync } from "react-icons/fa";
import { FaExclamation, FaListCheck, FaPlus, FaTrash } from "react-icons/fa6";

import { Alert } from "@/components/Alert";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataKrsSection } from "./-components/DataKrsSection";
import { InformasiUmumSection } from "./-components/InformasiUmumSection";
import { TabelPenawaranKelasBatch } from "./-components/TabelPenawaranKelasBatch";
import { TableSyaratPengisianKrs } from "./-components/TableSyaratPengisianKrs";
import { syaratPengisianKrsOptions } from "@/queries/mahasiswa";
import { WrapperKrs } from "./-components/WrapperKrs";

export const Route = createFileRoute("/(krs)/krs/pengisian")({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) => {
    queryClient.prefetchQuery(syaratPengisianKrsOptions);
  },
});

// Komponen untuk alert informasi
const InfoAlert = memo(() => (
  <Alert>
    <p className="text-sm md:text-base">
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
));

// Komponen untuk tombol pengisian KRS
const PengisianKrsButton = memo(({ isVisible }: { isVisible: boolean }) => {
  if (!isVisible) return null;

  return (
    <Button
      className="ms-auto"
      asChild
      size={"sm"}
    >
      <Link
        to="."
        hash="isi-krs"
      >
        <FaListCheck />
        Pengisian KRS
      </Link>
    </Button>
  );
});

// Komponen untuk bagian syarat pengisian
const SyaratPengisianSection = memo(({ onSyaratEnabled, isKrsEnabled }: { onSyaratEnabled: (enabled: boolean) => void; isKrsEnabled: boolean }) => (
  <Tabs defaultValue="syaratPengisian">
    <TabsList>
      <TabsTrigger value="syaratPengisian">Syarat Pengisian</TabsTrigger>
    </TabsList>
    <TabsContent value="syaratPengisian">
      <div className="flex flex-col">
        <div className="w-full max-w-4xl mx-auto p-2 md:p-4">
          <div className="overflow-x-auto">
            <div className="min-w-lg">
              <TableSyaratPengisianKrs onSyaratPengisisanKrsEnabled={onSyaratEnabled} />
            </div>
          </div>
        </div>
        <PengisianKrsButton isVisible={isKrsEnabled} />
      </div>
    </TabsContent>
  </Tabs>
));

// Komponen untuk alert-alert informasi
const InfoAlerts = memo(() => (
  <>
    <Alert variant="info">
      <p className="text-sm md:text-base">Apabila kouta penuh,mata kuliah tidak ada dan jadwal bentrok, silahkan hubungi Fakultas/Program Studi</p>
    </Alert>
    <Alert variant="info">
      <p className="text-sm md:text-base">
        Menu cetak KRS disediakan di &nbsp;
        <a
          className="text-[#105E15] font-semibold hover:underline"
          href="https://akademik.uin-suka.ac.id"
        >
          SIA
        </a>
      </p>
    </Alert>
  </>
));

// Komponen untuk legend keterangan tombol
const LegendSection = memo(() => (
  <div>
    <h2 className="font-bold mb-4">Keterangan :</h2>
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-2">
      <li className="flex items-center justify-start md:justify-center text-sm md:text-base">
        <Button className="mr-4 pointer-events-none [&_svg]:size-5">
          <FaPlus />
        </Button>
        Ambil Kelas
      </li>
      <li className="flex items-center justify-start md:justify-center text-sm md:text-base">
        <Button
          variant="destructive"
          className="mr-4 pointer-events-none [&_svg]:size-5"
        >
          <FaTrash />
        </Button>
        Hapus Kelas
      </li>
      <li className="flex items-center justify-start md:justify-center text-sm md:text-base">
        <Button
          variant="reloadKouta"
          className="mr-4 pointer-events-none [&_svg]:size-5"
        >
          <FaSync />
        </Button>
        Reload Kouta
      </li>
      <li className="flex items-center justify-start md:justify-center text-sm md:text-base">
        <Button
          variant="kelasPenuh"
          className="mr-4 pointer-events-none [&_svg]:size-5"
        >
          <FaExclamation />
        </Button>
        Kelas Penuh
      </li>
    </ul>
  </div>
));

// Komponen untuk tabs informasi dan data KRS
const InformasiTabs = memo(() => (
  <Tabs defaultValue="informasiUmum">
    <TabsList>
      <TabsTrigger value="informasiUmum">Informasi Umum</TabsTrigger>
      <TabsTrigger value="dataKrs">Data KRS</TabsTrigger>
    </TabsList>
    <TabsContent value="informasiUmum">
      <div className="flex flex-col gap-5">
        <InformasiUmumSection />
        <InfoAlerts />
        <LegendSection />
      </div>
    </TabsContent>
    <TabsContent value="dataKrs">
      <DataKrsSection />
    </TabsContent>
  </Tabs>
));

// Komponen untuk bagian tabel penawaran kelas
const PenawaranKelasSection = memo(() => (
  <div
    className="bg-white p-5 rounded-[5px] shadow flex flex-col"
    id="isi-krs"
  >
    <div className="w-full max-w-7xl rounded-lg">
      <div className="overflow-x-auto">
        <TabelPenawaranKelasBatch />
      </div>
    </div>
  </div>
));

function RouteComponent() {
  const [isKrsEnabled, setIsKrsEnabled] = useState(false);

  const handleSyaratEnabled = useCallback((enabled: boolean) => {
    setIsKrsEnabled(enabled);
  }, []);

  return (
    <WrapperKrs title="Pengisian Kartu Rencana Studi">
      <div className="space-y-4">
        <InfoAlert />

        <SyaratPengisianSection
          onSyaratEnabled={handleSyaratEnabled}
          isKrsEnabled={isKrsEnabled}
        />

        {isKrsEnabled && (
          <>
            <InformasiTabs />
            <PenawaranKelasSection />
          </>
        )}
      </div>
    </WrapperKrs>
  );
}
