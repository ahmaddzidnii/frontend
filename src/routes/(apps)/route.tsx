import { LoaderFallback } from "@/components/LoaderFallback";
import { useAuth } from "@/context/AuthContext";
import { DashboardLayout } from "@/layouts/Dashboardlayout";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(apps)")({
  component: RouteComponent,
});

function RouteComponent() {
  const auth = useAuth();

  if (auth.status === "pending") {
    return <LoaderFallback className="h-screen" />;
  }

  if (auth.status === "unauthenticated") {
    return <Navigate to="/login" />;
  }

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
