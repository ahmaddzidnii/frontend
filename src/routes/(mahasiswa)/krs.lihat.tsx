import { Alert } from "@/components/Alert";
import { Spinner } from "@/components/Spinner";
import { TabelInformasiUmum } from "@/components/tables/TabelInformasiUmum";
import { TabelListMataKuliahYangDiambil } from "@/components/tables/TabelListMataKuliahYangDiambil";
import { TabsList, Tabs, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { informasiUmumMhsOptions } from "@/queries/mahasiswa";
import { useSuspenseQuery } from "@tanstack/react-query";

import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { MdError } from "react-icons/md";

export const Route = createFileRoute("/(mahasiswa)/krs/lihat")({
  component: RouteComponent,
  loader: async ({ context: { queryClient } }) => {
    await queryClient.prefetchQuery(informasiUmumMhsOptions);
  },
});

const InformasiUmumSection = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-[176px]">
          <Spinner />
        </div>
      }
    >
      <ErrorBoundary
        fallback={
          <div className="flex items-center justify-center h-[176px]">
            <MdError className="mr-2" />
            Gagal melakukan load pada data informasi umum mahasiswa.
          </div>
        }
      >
        <InformasiUmumSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

const InformasiUmumSectionSuspense = () => {
  const { data } = useSuspenseQuery(informasiUmumMhsOptions);
  return (
    <TabelInformasiUmum
      tahunAkademik={data.tahun_akademik || "Tahun Akademik Tidak Tersedia"}
      semester={data.semester || "Semester Tidak Tersedia"}
      ipk={data.ipk?.toFixed(2) || "IPK Tidak Tersedia"}
      sksKumulatif={data.sks_kumulatif?.toString() || "SKS Kumulatif Tidak Tersedia"}
      ipsLalu={data.ips_lalu?.toFixed(2) || "IPS Lalu Tidak Tersedia"}
      jatahSks={data.jatah_sks?.toString() || "Jatah SKS Tidak Tersedia"}
      sksAmbil={data.sks_ambil.toString() || "SKS Ambil Tidak Tersedia"}
      sisaSks={data.sisa_sks?.toString() || "Sisa SKS Tidak Tersedia"}
    />
  );
};

function RouteComponent() {
  return (
    <>
      <header className="bg-white shadow  w-full">
        <nav className="px-3 py-2.5 border-b-4 w-max border-b-[#105E15] ">
          <span className="text-xl">Data Isian KRS Terakhir</span>
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
        <Tabs defaultValue="informasiUmum">
          <TabsList>
            <TabsTrigger value="informasiUmum">Informasi Umum</TabsTrigger>
          </TabsList>
          <TabsContent value="informasiUmum">
            <div className=" flex flex-col gap-5">
              <InformasiUmumSection />
            </div>
          </TabsContent>
        </Tabs>
        <Tabs defaultValue="daftarKelasMataKuliah">
          <TabsList>
            <TabsTrigger value="daftarKelasMataKuliah">Daftar Kelas Mata Kuliah</TabsTrigger>
          </TabsList>
          <TabsContent value="daftarKelasMataKuliah">
            <div className=" flex flex-col gap-5">
              <TabelListMataKuliahYangDiambil
                mataKuliahyangDiambil={[
                  {
                    id: "1",
                    kodeMataKuliah: "TIF101",
                    nama: "Pemrograman Dasar",
                    sks: 3,
                    kelas: "A",
                    dosenPengampu: [
                      {
                        nama: "Dr. Ahmad",
                        nip: "1234567890",
                      },
                    ],
                    jenis: "Wajib",
                    kurikulumMataKuliah: "Kurikulum 2020",
                    jadwal: [
                      {
                        hari: "Senin",
                        waktu: "08:00 - 10:00",
                        ruang: "Ruang 101",
                      },
                    ],
                  },
                ]}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
