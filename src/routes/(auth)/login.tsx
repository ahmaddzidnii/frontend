import { z } from "zod";
import { useState } from "react";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { EyeIcon, EyeOffIcon, LockIcon, UserIcon } from "lucide-react";

import { Logo } from "@/components/Logo";
import { Alert } from "@/components/Alert";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useLogin } from "@/hooks/auth/useLogin";
import { AuthLayout } from "@/layouts/AuthLayout";
import { AxiosResponseError, getErrorMessage } from "@/lib/errors";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const Route = createFileRoute("/(auth)/login")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Login KRS",
      },
    ],
  }),
});

function RouteComponent() {
  const { status, isDalamJadwal } = useAuth();

  if (status === "authenticated") {
    return <Navigate to="/dash" />;
  }
  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center w-full h-full gap-5">
        <Logo />
        <Card className="w-[450px] rounded-[5px] border-t-5 border-t-[#105E15]">
          <CardContent className="flex flex-col gap-5">
            <CardHeader className="text-center p-0">
              <h1 className="uppercase font-bold text-foreground">KARTU RENCANA STUDI</h1>
              <div className="rounded-[5px] bg-[#D2EBF0] text-foreground text-start p-5">
                Jika mengalami error bisa disampaikan melalui{" "}
                <a
                  href="https://uinsk.id/AplikasiKRS"
                  target="_blank"
                  className="hover:underline font-bold text-[#105E15]"
                >
                  https://uinsk.id/AplikasiKRS
                </a>
              </div>
            </CardHeader>
            {isDalamJadwal ? (
              <FormComponent />
            ) : (
              <div className="rounded-[5px] bg-[#FEE2E2] text-red-600 font-semibold p-5 text-center">
                <p className="text-sm">Aplikasi KRS ditutup, silahkan mengisi KRS pada jadwal yang sudah ditentukan.</p>
              </div>
            )}
          </CardContent>
        </Card>
        <p className="text-muted-foreground text-xs text-center">
          Copyright © {new Date().getFullYear()} <span className="font-bold">PTIPD - UIN Sunan Kalijaga.</span> All rights reserved.
        </p>
      </div>
    </AuthLayout>
  );
}

// 1. Definisikan Skema Validasi dengan Zod
const loginSchema = z.object({
  nim: z.string().min(1, "Username tidak boleh kosong."),
  password: z.string().min(1, "Password tidak boleh kosong."),
});

// Ekstrak tipe data dari skema untuk keamanan tipe
type LoginFormValues = z.infer<typeof loginSchema>;

export function FormComponent() {
  const { mutate, isPending, isError, error } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState<LoginFormValues>({
    nim: "",
    password: "",
  });

  // 2. State untuk menampung error validasi dari Zod
  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof LoginFormValues, string>>>({});

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
    // Hapus error untuk field yang sedang diubah untuk UX yang lebih baik
    if (validationErrors[id as keyof LoginFormValues]) {
      setValidationErrors({ ...validationErrors, [id]: undefined });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 3. Lakukan validasi menggunakan Zod
    const result = loginSchema.safeParse(data);

    // Jika validasi gagal, tampilkan error
    if (!result.success) {
      const formattedErrors: Partial<Record<keyof LoginFormValues, string>> = {};
      result.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0] as keyof LoginFormValues] = issue.message;
      });
      setValidationErrors(formattedErrors);
      return;
    }

    // Jika validasi berhasil, hapus error lama dan kirim data
    setValidationErrors({});
    mutate(result.data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      noValidate // Mencegah validasi bawaan browser
    >
      {/* Penanganan error dari server (setelah submit) */}
      {isError && (
        <Alert variant="error">
          <div className="flex flex-col gap-1 text-red-600">
            <p className="text-sm font-semibold">{getErrorMessage(error)}</p>
            {error instanceof AxiosResponseError && error.data && (
              <ul className="list-disc pl-5 text-sm">
                {Object.entries(error.data as Record<string, string[]>).map(([field, messages]) => (
                  <li key={field}>{Array.isArray(messages) ? messages.join(", ") : messages}</li>
                ))}
              </ul>
            )}
          </div>
        </Alert>
      )}

      {/* Input Username */}
      <div className="flex flex-col space-y-1">
        <label
          htmlFor="nim"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Username
        </label>
        <div className="relative flex items-center">
          <input
            id="nim"
            value={data.nim}
            onChange={handleInputChange}
            type="text"
            placeholder="Masukkan username Anda"
            className={`flex h-10 w-full rounded-[5px] border bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 pr-13 ${
              validationErrors.nim ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#105E15]"
            }`}
          />
          <div className="absolute inset-y-0 right-0 flex items-center px-3 border rounded-e-[5px] pointer-events-none bg-[#EAEBEC]">
            <UserIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        {validationErrors.nim && <p className="text-sm text-red-600 mt-1">{validationErrors.nim}</p>}
      </div>

      {/* Input Password */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <a
            href="#"
            className="text-sm text-[#105E15] hover:underline"
          >
            Lupa Password?
          </a>
        </div>
        <div className="relative flex items-center">
          <input
            id="password"
            value={data.password}
            onChange={handleInputChange}
            type={showPassword ? "text" : "password"}
            placeholder="Masukkan password Anda"
            className={`flex h-10 w-full rounded-[5px] border bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 pr-20 ${
              validationErrors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#105E15]"
            }`}
          />
          <div className="absolute inset-y-0 right-10 flex items-center pr-3">
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="p-1.5 rounded-full hover:bg-gray-200"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOffIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center border rounded-e-[5px] px-3 bg-[#EAEBEC] pointer-events-none">
            <LockIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        {validationErrors.password && <p className="text-sm text-red-600 mt-1">{validationErrors.password}</p>}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="ml-auto"
      >
        {isPending ? "Loading..." : "Login"}
      </Button>
    </form>
  );
}
