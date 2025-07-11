import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/petugas/")({
  beforeLoad: async () => {
    throw redirect({
      to: "/petugas/dash",
      replace: true,
    });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return null;
}
