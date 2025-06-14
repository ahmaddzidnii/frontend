import { Alert } from "@/components/Alert";
import { DashboardLayout } from "@/layout/Dashboardlayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/krs/lihat/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <DashboardLayout>
      <header className="bg-white shadow  w-full">
        <nav className="px-3 py-2.5 border-b-4 w-max border-b-[#105E15] ">
          <span className="text-xl">Data Isian KRS Terakhir</span>
        </nav>
      </header>

      <div className="shadow flex-1  p-10 flex flex-col gap-5">
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
        <Alert>
          <p>
            Assalamu'alaikum wa rahmatullahi wa barakatuh, <b className="text-[#105E15]">Ahmad Zidni Hidayat</b>
            <br />
            Selamat datang di Kartu Rencana Studi (KRS) UIN Sunan Kalijaga Yogyakarta.
          </p>
        </Alert>
      </div>
    </DashboardLayout>
  );
}
