import { MdError } from "react-icons/md";
import { Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Spinner } from "@/components/Spinner";
import { syaratPengisianKrsOptions } from "@/queries/mahasiswa";

interface SyaratPengisianKrsType {
  onSyaratPengisisanKrsEnabled?: (enabled: boolean) => void;
}

export const TableSyaratPengisianKrs = ({ onSyaratPengisisanKrsEnabled }: SyaratPengisianKrsType) => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-[165.33px]">
          <Spinner />
        </div>
      }
    >
      <ErrorBoundary
        fallback={
          <div className="flex items-center justify-center h-[165.33px]">
            <MdError className="mr-2" />
            Gagal melakukan load pada data syarat pengisian krs.
          </div>
        }
      >
        <TableSyaratPengisianKrsSuspense onSyaratPengisisanKrsEnabled={onSyaratPengisisanKrsEnabled} />
      </ErrorBoundary>
    </Suspense>
  );
};

export const TableSyaratPengisianKrsSuspense = ({ onSyaratPengisisanKrsEnabled }: SyaratPengisianKrsType) => {
  const { data: syaratKrs } = useSuspenseQuery(syaratPengisianKrsOptions);

  useEffect(() => {
    // Pastikan prop callback ada sebelum memanggilnya
    if (onSyaratPengisisanKrsEnabled) {
      onSyaratPengisisanKrsEnabled(syaratKrs.pengisisan_krs_enabled);
    }
  }, [syaratKrs.pengisisan_krs_enabled, onSyaratPengisisanKrsEnabled]);

  return (
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
        {syaratKrs.data_syarat.map((s, idx) => (
          <tr key={idx}>
            <td style={{ border: "1px solid #ddd", padding: 8, textAlign: "center" }}>{idx + 1}.</td>
            <td style={{ border: "1px solid #ddd", padding: 8 }}>{s.syarat}</td>
            <td style={{ border: "1px solid #ddd", padding: 8 }}>{s.isi}</td>
            <td style={{ border: "1px solid #ddd", padding: 8 }}>
              {s.status ? (
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
              ) : (
                <svg
                  className="w-6 h-6 text-red-500 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
