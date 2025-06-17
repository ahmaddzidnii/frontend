import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // Simulate logout API call (optional)
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Remove token
      localStorage.removeItem("auth_token");

      return true;
    },
    onSuccess: () => {
      // Clear auth cache
      queryClient.setQueryData(["auth"], null);
      queryClient.removeQueries({ queryKey: ["auth"] });

      queryClient.clear();
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      localStorage.removeItem("auth_token");
      queryClient.setQueryData(["auth"], null);
    },
  });
};
