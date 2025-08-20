import { Suspense, memo, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { MdError } from "react-icons/md";

import { Spinner } from "@/components/Spinner";
import { TabelInformasiUmum } from "@/components/tables/TabelInformasiUmum";
import { TabsList, Tabs, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getKelasDiambilMhsOptions } from "@/queries/kelas";
import { informasiUmumMhsOptions } from "@/queries/mahasiswa";
import { WrapperKrs } from "./-components/WrapperKrs";

export const Route = createFileRoute("/(krs)/krs/lihat")({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) => {
    queryClient.prefetchQuery(informasiUmumMhsOptions);
    queryClient.prefetchQuery(getKelasDiambilMhsOptions);
  },
});

// Komponen untuk loading fallback
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-[176px]">
    <Spinner />
  </div>
);

// Komponen untuk error fallback
const ErrorFallback = ({ message }: { message: string }) => (
  <div className="flex items-center justify-center h-[176px]">
    <MdError className="mr-2" />
    {message}
  </div>
);

// Komponen untuk menampilkan informasi umum mahasiswa
const InformasiUmumSection = memo(() => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ErrorBoundary fallback={<ErrorFallback message="Gagal melakukan load pada data informasi umum mahasiswa." />}>
        <InformasiUmumSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  );
});

// Komponen suspense untuk data informasi umum
const InformasiUmumSectionSuspense = memo(() => {
  const { data } = useSuspenseQuery(informasiUmumMhsOptions);

  const tableProps = useMemo(
    () => ({
      tahunAkademik: data.tahun_akademik || "Tahun Akademik Tidak Tersedia",
      semester: data.semester || "Semester Tidak Tersedia",
      ipk: data.ipk?.toFixed(2) || "IPK Tidak Tersedia",
      sksKumulatif: data.sks_kumulatif?.toString() || "SKS Kumulatif Tidak Tersedia",
      ipsLalu: data.ips_lalu?.toFixed(2) || "IPS Lalu Tidak Tersedia",
      jatahSks: data.jatah_sks?.toString() || "Jatah SKS Tidak Tersedia",
      sksAmbil: data.sks_ambil.toString() || "SKS Ambil Tidak Tersedia",
      sisaSks: data.sisa_sks?.toString() || "Sisa SKS Tidak Tersedia",
    }),
    [data]
  );

  return <TabelInformasiUmum {...tableProps} />;
});

function RouteComponent() {
  return (
    <WrapperKrs title="Data Isian KRS Terakhir">
      <div className="space-y-4">
        <Tabs defaultValue="informasiUmum">
          <TabsList>
            <TabsTrigger value="informasiUmum">Informasi Umum</TabsTrigger>
          </TabsList>
          <TabsContent value="informasiUmum">
            <div className="flex flex-col gap-5">
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
    </WrapperKrs>
  );
}

// Komponen untuk menampilkan jadwal mata kuliah
const JadwalCell = memo(({ jadwal }: { jadwal: { hari: string; waktu_mulai: string; waktu_selesai: string; ruangan: string }[] }) => {
  if (jadwal.length === 0) {
    return <div className="flex items-center justify-center">-</div>;
  }

  return (
    <>
      {jadwal.map((j, idx) => (
        <div
          className="mb-5"
          key={idx}
        >
          <div>
            {j.hari}, {j.waktu_mulai} - {j.waktu_selesai}
          </div>
          <div className="text-xs text-gray-500">Ruang : {j.ruangan}</div>
        </div>
      ))}
    </>
  );
});

// Komponen untuk menampilkan dosen pengajar
const DosenCell = memo(({ dosenPengajar }: { dosenPengajar: { nip_dosen: string; nama_dosen: string }[] }) => {
  if (dosenPengajar.length === 0) {
    return <div className="flex items-center justify-center">-</div>;
  }

  return (
    <>
      {dosenPengajar.map((d) => (
        <div
          className="mb-5"
          key={d.nip_dosen}
        >
          {d.nama_dosen}
        </div>
      ))}
    </>
  );
});

// Komponen untuk header tabel
const TableHeader = memo(() => (
  <thead className="bg-gray-50">
    <tr>
      <th
        scope="col"
        className="px-4 py-3 font-semibold text-gray-600  w-16 text-center border border-gray-300"
      >
        No.
      </th>
      <th
        scope="col"
        className="px-4 py-3 font-semibold text-gray-600  border border-gray-300"
      >
        Mata Kuliah
      </th>
      <th
        scope="col"
        className="px-4 py-3 font-semibold text-gray-600  text-center border border-gray-300"
      >
        SKS
      </th>
      <th
        scope="col"
        className="px-4 py-3 font-semibold text-gray-600  text-center border border-gray-300"
      >
        Kelas
      </th>
      <th
        scope="col"
        className="px-4 py-3 font-semibold text-gray-600  border border-gray-300"
      >
        Jenis
      </th>
      <th
        scope="col"
        className="px-4 py-3 font-semibold text-gray-600  border border-gray-300"
      >
        Jadwal
      </th>
      <th
        scope="col"
        className="px-4 py-3 font-semibold text-gray-600  border border-gray-300"
      >
        Dosen
      </th>
    </tr>
  </thead>
));

// Komponen untuk row kosong ketika tidak ada data
const EmptyRow = memo(() => (
  <tr>
    <td
      colSpan={7}
      align="center"
      className="h-[100px] text-base border"
    >
      Tidak ada kelas yang anda ambil
    </td>
  </tr>
));

// Komponen untuk menampilkan daftar kelas mata kuliah
const DaftarKelasMataKuliah = memo(() => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ErrorBoundary fallback={<ErrorFallback message="Gagal melakukan load pada data daftar kelas mata kuliah mahasiswa." />}>
        <DaftarKelasMataKuliahSuspense />
      </ErrorBoundary>
    </Suspense>
  );
});

// Komponen suspense untuk data daftar kelas mata kuliah
const DaftarKelasMataKuliahSuspense = memo(() => {
  const { data: dataKrs } = useSuspenseQuery(getKelasDiambilMhsOptions);

  const tableRows = useMemo(() => {
    if (dataKrs.length === 0) {
      return <EmptyRow />;
    }

    return dataKrs.map((k, idx) => (
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
        <td className="px-4 py-3 align-top border border-gray-300 ">{k.jenis_mata_kuliah}</td>
        {/* Jadwal */}
        <td className="px-4 py-3 align-top border border-gray-300">
          <JadwalCell jadwal={k.jadwal} />
        </td>
        {/* Dosen */}
        <td className="px-4 py-3 align-top border border-gray-300">
          <DosenCell dosenPengajar={k.dosen_pengajar} />
        </td>
      </tr>
    ));
  }, [dataKrs]);

  return (
    <div className="flex flex-col gap-5 overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-700 border-collapse">
        <TableHeader />
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
});
