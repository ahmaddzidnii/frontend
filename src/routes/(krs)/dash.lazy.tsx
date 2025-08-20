import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { Alert } from "@/components/Alert";
import { useAuth } from "@/context/AuthContext";
import { WrapperKrs } from "./-components/WrapperKrs";
import { Button } from "@/components/ui/button";
import { FaListCheck } from "react-icons/fa6";

export const Route = createLazyFileRoute("/(krs)/dash")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuth();
  return (
    <WrapperKrs title="Dashboard">
      <div className="space-y-4 font-sans">
        <Alert>
          <p className="text-sm">
            Assalamu'alaikum wa rahmatullahi wa barakatuh,
            <b className="text-[#105E15] uppercase">
              &nbsp;
              {user?.name}
            </b>
            <br />
            Selamat datang di Kartu Rencana Studi (KRS) UIN Sunan Kalijaga Yogyakarta.
          </p>
          <Link to="/krs/pengisian">
            <Button
              variant="default"
              className="mt-5"
            >
              <FaListCheck />
              Isi KRS
            </Button>
          </Link>
        </Alert>
      </div>
    </WrapperKrs>
  );
}
