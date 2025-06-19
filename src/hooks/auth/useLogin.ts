import { login } from "@/api/login";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const loginMutation = useMutation({
    mutationFn: async (credentials: { nim: string; password: string }) => {
      await login(credentials.nim, credentials.password);
    },
    onSuccess: () => {
      window.location.reload();
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  return loginMutation;
};
