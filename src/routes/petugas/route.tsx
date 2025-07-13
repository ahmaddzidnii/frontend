import { PetugasLayout } from "@/layouts/PetugasLayout";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/petugas")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <PetugasLayout>
        <Outlet />
      </PetugasLayout>
    </>
  );
}
