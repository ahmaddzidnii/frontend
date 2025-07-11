import { Suspense } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { HeadContent, Outlet, createRootRouteWithContext } from "@tanstack/react-router";

import { authKeys } from "@/lib/query-keys";
import { getSessionData } from "@/api/get-session";
import { AuthProvider } from "@/context/AuthContext";
import type { QueryClient } from "@tanstack/react-query";
import { LoaderFallback } from "@/components/LoaderFallback";
import { ConfirmationProvider } from "@/hooks/useConfirmDialog";

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Suspense fallback={<LoaderFallback className="h-screen" />}>
        <AuthProvider>
          <ConfirmationProvider>
            <HeadContent />
            <Outlet />
          </ConfirmationProvider>
        </AuthProvider>
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
      <TanStackRouterDevtools />
    </>
  ),

  head: () => ({
    meta: [
      {
        title: "Kartu Rencana Studi",
      },
    ],
  }),
  beforeLoad: ({ context: { queryClient } }) => {
    queryClient.prefetchQuery({
      queryKey: authKeys.me(),
      queryFn: async () => {
        return await getSessionData();
      },
      retry: false,
      staleTime: 5 * 60 * 1000,
    });
  },
});
