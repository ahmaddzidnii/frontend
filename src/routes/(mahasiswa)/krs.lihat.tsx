import { Alert } from "@/components/Alert";
import { TabelInformasiUmum } from "@/components/tables/TabelInformasiUmum";
import { TabelListMataKuliahYangDiambil } from "@/components/tables/TabelListMataKuliahYangDiambil";
import { TabsList, Tabs, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(mahasiswa)/krs/lihat")({
  component: RouteComponent,
});

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
