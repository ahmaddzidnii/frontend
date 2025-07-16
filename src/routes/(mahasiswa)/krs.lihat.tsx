import { Alert } from "@/components/Alert";
import { Spinner } from "@/components/Spinner";
import { TabelInformasiUmum } from "@/components/tables/TabelInformasiUmum";
import { TabsList, Tabs, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getKelasDiambilMhsOptions } from "@/queries/kelas";
import { informasiUmumMhsOptions } from "@/queries/mahasiswa";
import { useSuspenseQuery } from "@tanstack/react-query";

import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { MdError } from "react-icons/md";

export const Route = createFileRoute("/(mahasiswa)/krs/lihat")({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) => {
    queryClient.prefetchQuery(informasiUmumMhsOptions);
    queryClient.prefetchQuery(getKelasDiambilMhsOptions);
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
            <DaftarKelasMataKuliah />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

const DaftarKelasMataKuliah = () => {
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
            Gagal melakukan load pada data daftar kelas mata kuliah mahasiswa.
          </div>
        }
      >
        <DaftarKelasMataKuliahSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

const DaftarKelasMataKuliahSuspense = () => {
  const { data: dataKrs } = useSuspenseQuery(getKelasDiambilMhsOptions);
  return (
    <div className=" flex flex-col gap-5">
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
          </tr>
        </thead>
        {/* Body Tabel */}
        <tbody>
          {dataKrs.length > 0 ? (
            dataKrs.map((k, idx) => (
              <tr
                key={k.id_kelas}
                className="hover:bg-gray-50"
              >
                {/* Nomor */}
                <td className="px-4 py-3 text-center align-top border border-gray-300">{idx + 1}</td>
                {/* Mata Kuliah */}
                <td className="px-4 py-3 align-top border border-gray-300">
                  <div className="font-bold text-[#105E15]">{k.kode_kurikulum}</div>
                  <div className="text-gray-500">{k.kode_mata_kuliah}</div>
                  <div>{k.nama_mata_kuliah}</div>
                </td>
                {/* SKS */}
                <td className="px-4 py-3 text-center align-top border border-gray-300">{k.sks}</td>
                {/* Kelas */}
                <td className="px-4 py-3 text-center align-top border border-gray-300">{k.nama_kelas}</td>
                {/* Jenis */}
                <td className="px-4 py-3 align-top border border-gray-300 uppercase">{k.jenis_mata_kuliah}</td>
                {/* Jadwal */}
                <td className="px-4 py-3 align-top border border-gray-300">
                  {k.jadwal.length > 0 ? (
                    k.jadwal.map((j, idx) => (
                      <div
                        className="mb-5"
                        key={idx}
                      >
                        <div>
                          {j.hari}, {j.waktu_mulai} - {j.waktu_selesai}
                        </div>
                        <div className="text-xs text-gray-500">Ruang : {j.ruangan}</div>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center">-</div>
                  )}
                </td>
                <td className="px-4 py-3 align-top border border-gray-300">
                  {k.dosen_pengajar.length > 0 ? (
                    k.dosen_pengajar.map((d) => (
                      <div
                        className="mb-5"
                        key={d.nip_dosen}
                      >
                        {d.nama_dosen}
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center">-</div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={8}
                align="center"
                className="h-[100px] text-base"
              >
                Tidak ada kelas yang anda ambil
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
