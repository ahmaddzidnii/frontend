import { createLazyFileRoute } from "@tanstack/react-router";

import { Alert } from "@/components/Alert";
import { useAuth } from "@/context/AuthContext";
import { WrapperKrs } from "./-components/WrapperKrs";

export const Route = createLazyFileRoute("/(krs)/dash")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuth();
  return (
    <WrapperKrs title="Dashboard">
      <div className="space-y-4">
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
            Assalamu'alaikum wa rahmatullahi wa barakatuh,
            <b className="text-[#105E15]">
              &nbsp;
              {user?.name.toLowerCase().replace(/\b(\w)/g, (x) => x.toUpperCase())}
            </b>
            <br />
            Selamat datang di Kartu Rencana Studi (KRS) UIN Sunan Kalijaga Yogyakarta.
          </p>
        </Alert>
      </div>
    </WrapperKrs>
  );
}
