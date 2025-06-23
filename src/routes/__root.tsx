import { ConfirmationProvider } from "@/hooks/useConfirmDialog";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { HeadContent, Outlet, createRootRouteWithContext } from "@tanstack/react-router";

import type { QueryClient } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext";
import { authKeys } from "@/lib/query-keys";
import { getSessionData } from "@/api/get-session";
import { Suspense } from "react";
import { LoaderFallback } from "@/components/LoaderFallback";

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <Suspense fallback={<LoaderFallback className="h-screen" />}>
      <AuthProvider>
        <ConfirmationProvider>
          <HeadContent />
          <Outlet />
          <ReactQueryDevtools initialIsOpen={false} />
          <TanStackRouterDevtools />
        </ConfirmationProvider>
      </AuthProvider>
    </Suspense>
  ),

  head: () => ({
    meta: [
      {
        title: "Kartu Rencana Studi",
      },
    ],
  }),
  beforeLoad: async ({ context: { queryClient } }) => {
    await queryClient.prefetchQuery({
      queryKey: authKeys.me(),
      queryFn: async () => {
        const session = await getSessionData();
        return session;
      },
      retry: false,
      staleTime: 5 * 60 * 1000,
    });
  },

  errorComponent: ({ error }) => {
    return JSON.stringify(error, null, 2);
  },
});
