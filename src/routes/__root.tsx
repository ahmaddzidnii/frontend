import { ConfirmationProvider } from "@/hooks/useConfirmDialog";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { HeadContent, Outlet, createRootRouteWithContext } from "@tanstack/react-router";

import type { QueryClient } from "@tanstack/react-query";
import type { AuthContextType } from "@/context/AuthContext";

interface RouterContext {
  queryClient: QueryClient;
  auth: AuthContextType;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <ConfirmationProvider>
      <HeadContent />
      <Outlet />
      <ReactQueryDevtools initialIsOpen={false} />
      <TanStackRouterDevtools />
    </ConfirmationProvider>
  ),

  head: () => ({
    meta: [
      {
        title: "Kartu Rencana Studi",
      },
    ],
  }),
});
