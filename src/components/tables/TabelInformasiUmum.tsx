interface TabelInformasiUmumProps {
  tahunAkademik: string;
  semester: string;
  ipk: string;
  sksKumulatif: string;
  ipsLalu: string;
  jatahSks: string;
  sksAmbil: string;
  sisaSks: string;
}

export const TabelInformasiUmum = ({ tahunAkademik, semester, ipk, sksKumulatif, ipsLalu, jatahSks, sksAmbil, sisaSks }: TabelInformasiUmumProps) => {
  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {/* Body Tabel */}
          <tbody>
            {/* Baris 1 */}
            <tr>
              <td className="p-3 font-medium text-gray-600 w-1/4">Tahun Akademik</td>
              <td className="p-3 text-gray-800 w-1/4">:&nbsp;&nbsp;{tahunAkademik}</td>
              <td className="p-3 font-medium text-gray-600 w-1/4">IPS Lalu</td>
              <td className="p-3 text-gray-800 w-1/4">:&nbsp;&nbsp;{ipsLalu}</td>
            </tr>
            {/* Baris 2 */}
            <tr>
              <td className="p-3 font-medium text-gray-600">Semester</td>
              <td className="p-3 text-gray-800 uppercase">:&nbsp;&nbsp;{semester}</td>
              <td className="p-3 font-medium text-gray-600">Jatah SKS</td>
              <td className="p-3 text-gray-800">:&nbsp;&nbsp;{jatahSks}</td>
            </tr>
            {/* Baris 3 */}
            <tr>
              <td className="p-3 font-medium text-gray-600">IPK</td>
              <td className="p-3 text-gray-800">:&nbsp;&nbsp;{ipk}</td>
              <td className="p-3 font-medium text-gray-600">SKS Ambil</td>
              <td className="p-3 text-gray-800">:&nbsp;&nbsp;{sksAmbil}</td>
            </tr>
            {/* Baris 4 */}
            <tr>
              <td className="p-3 font-medium text-gray-600">SKS Kumulatif</td>
              <td className="p-3 text-gray-800">:&nbsp;&nbsp;{sksKumulatif}</td>
              <td className="p-3 font-medium text-gray-600">Sisa SKS</td>
              <td className="p-3 text-gray-800">:&nbsp;&nbsp;{sisaSks}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
