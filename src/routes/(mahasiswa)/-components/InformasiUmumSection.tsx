import { getInformasiUmumMhs } from "@/api/get-informasi-umum-mhs";
import { Spinner } from "@/components/Spinner";
import { TabelInformasiUmum } from "@/components/tables/TabelInformasiUmum";
import { useQuery } from "@tanstack/react-query";

export const InformasiUmumSection = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["informasi-umum-mhs"],
    queryFn: getInformasiUmumMhs,
    staleTime: 1000 * 60 * 1, // 1 minute
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[176px]">
        <Spinner />
      </div>
    );
  }

  if (!data || isError) {
    return <div className="flex items-center justify-center h-[176px]">Error loading data</div>;
  }

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
