import { Suspense } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { HeadContent, Link, Outlet, createRootRouteWithContext } from "@tanstack/react-router";

import { authKeys } from "@/lib/query-keys";
import { getSessionData } from "@/api/get-session";
import { AuthProvider } from "@/context/AuthContext";
import type { QueryClient } from "@tanstack/react-query";
import { LoaderFallback } from "@/components/LoaderFallback";
import { ConfirmationProvider } from "@/hooks/useConfirmDialog";
import { AlertDialogProvider } from "@/hooks/useAlertDialog";

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  notFoundComponent: () => (
    <section className="min-h-screen pt-16">
      <div className="flex flex-col items-center justify-center h-full px-4">
        <h1 className="font-bold text-[#105E15] mb-2 text-[150px] md:text-[200px] lg:text-[300px]">404</h1>
        <p className="text-lg sm:text-xl text-gray-800 mb-4">Halaman Tidak Ditemukan</p>
        <p className="text-sm sm:text-base text-gray-600 mb-8">Maaf, halaman yang Anda cari tidak tersedia.</p>
        <Link
          className="bg-[#105E15]/90 text-white px-6 py-3 rounded-md hover:bg-[#105E15] transition-colors duration-200"
          to="/"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </section>
  ),
  component: () => (
    <>
      <Suspense fallback={<LoaderFallback className="h-screen" />}>
        <AuthProvider>
          <ConfirmationProvider>
            <AlertDialogProvider>
              <HeadContent />
              <Outlet />
            </AlertDialogProvider>
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
