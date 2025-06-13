import { HeadContent, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="bg-[#ECEDF1]">
      <HeadContent />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
