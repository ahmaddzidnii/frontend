import { login } from "@/api/login";

import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const loginMutation = useMutation({
    mutationFn: async (credentials: { nim: string; password: string }) => {
      return await login(credentials.nim, credentials.password);
    },
    onSuccess: (data) => {
      localStorage.setItem("session_id", data.session_id);
      setTimeout(() => {
        window.location.href = "/dash";
      });
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  return loginMutation;
};
