import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: { nim: string; password: string }) => {
      // Simulate login API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulasi validasi credentials
      if (credentials.nim === "A123456789" && credentials.password === "password") {
        const userData = {
          id: "12345",
          name: "John Doe",
          nim: "A123456789",
        };

        // Simulasi menyimpan token
        localStorage.setItem("auth_token", "mock_jwt_token");

        return userData;
      } else {
        throw new Error("Invalid credentials");
      }
    },
    onSuccess: (userData) => {
      queryClient.setQueryData(["auth"], userData);
    },
    onError: (error) => {
      // Remove token jika login gagal
      localStorage.removeItem("auth_token");
      console.error("Login failed:", error);
    },
  });
};
