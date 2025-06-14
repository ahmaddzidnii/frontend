import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  loader: () => {
    throw redirect({
      to: "/dash",
      replace: true,
    });
  },
  component: App,
});

function App() {
  return <div className="text-center">home</div>;
}
