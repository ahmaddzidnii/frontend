// import { LoaderFallback } from "@/components/LoaderFallback";
import { useAuth } from "@/context/AuthContext";
import { DashboardLayout } from "@/layouts/Dashboardlayout";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(krs)")({
  component: RouteComponent,
  notFoundComponent: () => {
    return (
      <section className="min-h-screen ">
        <div className="flex flex-col items-center justify-center h-full px-4">
          <h1 className="font-bold text-[#105E15] mb-2 text-[150px] md:text-[200px] lg:text-[300px]">404</h1>
          <p className="text-lg sm:text-xl text-gray-800 mb-4">Halaman Tidak Ditemukan</p>
          <p className="text-sm sm:text-base text-gray-600 mb-8">Maaf, halaman yang Anda cari tidak tersedia.</p>
        </div>
      </section>
    );
  },
});

function RouteComponent() {
  const auth = useAuth();

  if (auth.status === "unauthenticated") {
    return <Navigate to="/login" />;
  }

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
