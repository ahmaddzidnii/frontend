import { useMutation } from "@tanstack/react-query";

import { logout } from "@/api/logout";

export const useLogout = () => {
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      window.localStorage.removeItem("session_id");
      window.location.reload();
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      window.alert("Gagal keluar, silakan coba lagi.");
    },
  });

  return {
    logout: logoutMutation,
    isLoading: logoutMutation.isPending,
    isError: logoutMutation.isError,
    error: logoutMutation.error,
  };
};
