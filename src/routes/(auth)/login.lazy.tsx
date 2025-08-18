import { createLazyFileRoute } from "@tanstack/react-router";
import { useState, useCallback, memo } from "react";
import { Navigate } from "@tanstack/react-router";
import { z } from "zod";
import { EyeIcon, EyeOffIcon, LockIcon, UserIcon } from "lucide-react";

import { Alert } from "@/components/Alert";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useLogin } from "@/hooks/auth/useLogin";
import { AuthLayout } from "@/layouts/AuthLayout";
import { getErrorMessage } from "@/lib/errors";

export const Route = createLazyFileRoute("/(auth)/login")({
  component: RouteComponent,
});

const loginSchema = z.object({
  nim: z.string().min(1, "Username tidak boleh kosong."),
  password: z.string().min(1, "Password tidak boleh kosong."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function RouteComponent() {
  const { status, isDalamJadwal } = useAuth();

  if (status === "authenticated") {
    return <Navigate to="/dash" />;
  }

  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center w-full h-full gap-3 sm:gap-5 px-4 sm:px-0">
        <Logo />
        <Card className="w-full max-w-[450px] sm:w-[450px] rounded-[5px] border-t-4 sm:border-t-5 border-t-[#105E15]">
          <CardContent className="flex flex-col gap-3 sm:gap-5 p-4 sm:p-6">
            <CardHeader className="text-center p-0">
              <h1 className="uppercase font-bold text-foreground text-sm sm:text-base">KARTU RENCANA STUDI</h1>
              <div className="rounded-[5px] bg-[#D2EBF0] text-foreground text-start p-3 sm:p-5 text-xs sm:text-sm">
                Jika mengalami error bisa disampaikan melalui{" "}
                <a
                  href="https://uinsk.id/AplikasiKRS"
                  target="_blank"
                  className="hover:underline font-bold text-[#105E15] break-all sm:break-normal"
                >
                  https://uinsk.id/AplikasiKRS
                </a>
              </div>
            </CardHeader>
            {isDalamJadwal ? (
              <FormComponent />
            ) : (
              <div className="rounded-[5px] bg-[#FEE2E2] text-red-600 font-semibold p-3 sm:p-5 text-center">
                <p className="text-xs sm:text-sm">Aplikasi KRS ditutup, silahkan mengisi KRS pada jadwal yang sudah ditentukan.</p>
              </div>
            )}
          </CardContent>
        </Card>
        <p className="text-muted-foreground text-xs text-center px-4 max-w-md">
          Copyright © {new Date().getFullYear()} <span className="font-bold">PTIPD - UIN Sunan Kalijaga.</span> All rights reserved.
        </p>
      </div>
    </AuthLayout>
  );
}

// Komponen input username yang di-memoize untuk mencegah re-render
const UsernameField = memo(
  ({ value, onChange, error }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; error?: string }) => (
    <div className="flex flex-col space-y-1">
      <label
        htmlFor="nim"
        className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Username
      </label>
      <div className="relative flex items-center">
        <input
          id="nim"
          value={value}
          onChange={onChange}
          type="text"
          placeholder="Masukkan username Anda"
          className={`flex h-9 sm:h-10 w-full rounded-[5px] border bg-transparent px-3 py-2 text-xs sm:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 pr-11 sm:pr-13 ${
            error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#105E15]"
          }`}
        />
        <div className="absolute inset-y-0 right-0 flex items-center px-2 sm:px-3 border rounded-e-[5px] pointer-events-none bg-[#EAEBEC]">
          <UserIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
        </div>
      </div>
      {error && <p className="text-xs sm:text-sm text-red-600 mt-1">{error}</p>}
    </div>
  )
);

// Komponen input password yang di-memoize untuk mencegah re-render
const PasswordField = memo(
  ({
    value,
    onChange,
    error,
    showPassword,
    onToggleVisibility,
  }: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    showPassword: boolean;
    onToggleVisibility: () => void;
  }) => (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <label
          htmlFor="password"
          className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Password
        </label>
        <a
          href="#"
          className="text-xs sm:text-sm text-[#105E15] hover:underline"
        >
          Lupa Password?
        </a>
      </div>
      <div className="relative flex items-center">
        <input
          id="password"
          value={value}
          onChange={onChange}
          type={showPassword ? "text" : "password"}
          placeholder="Masukkan password Anda"
          className={`flex h-9 sm:h-10 w-full rounded-[5px] border bg-transparent px-3 py-2 text-xs sm:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 pr-16 sm:pr-20 ${
            error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#105E15]"
          }`}
        />
        <div className="absolute inset-y-0 right-8 sm:right-10 flex items-center pr-2 sm:pr-3">
          <button
            type="button"
            onClick={onToggleVisibility}
            className="p-1 sm:p-1.5 rounded-full hover:bg-gray-200 touch-manipulation"
            aria-label="Toggle password visibility"
          >
            {showPassword ? (
              <EyeOffIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
            ) : (
              <EyeIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
            )}
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center border rounded-e-[5px] px-2 sm:px-3 bg-[#EAEBEC] pointer-events-none">
          <LockIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
        </div>
      </div>
      {error && <p className="text-xs sm:text-sm text-red-600 mt-1">{error}</p>}
    </div>
  )
);

// Komponen error alert yang di-memoize
const ErrorAlert = memo(({ isError, error }: { isError: boolean; error: any }) => {
  if (!isError) return null;

  return (
    <Alert variant="error">
      <div className="flex flex-col gap-1 text-red-600">
        <p className="text-xs sm:text-sm font-semibold">{getErrorMessage(error)}</p>
      </div>
    </Alert>
  );
});

export function FormComponent() {
  const { mutate, isPending, isError, error } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginFormValues>({
    nim: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof LoginFormValues, string>>>({});

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  // Handler khusus untuk username field
  const handleUsernameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setFormData((prev) => ({ ...prev, nim: value }));

      // Hapus error untuk username jika ada
      if (validationErrors.nim) {
        setValidationErrors((prev) => ({ ...prev, nim: undefined }));
      }
    },
    [validationErrors.nim]
  );

  // Handler khusus untuk password field
  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setFormData((prev) => ({ ...prev, password: value }));

      // Hapus error untuk password jika ada
      if (validationErrors.password) {
        setValidationErrors((prev) => ({ ...prev, password: undefined }));
      }
    },
    [validationErrors.password]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Lakukan validasi menggunakan Zod
      const result = loginSchema.safeParse(formData);

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
    },
    [formData, mutate]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 sm:gap-4"
      noValidate // Mencegah validasi bawaan browser
    >
      <ErrorAlert
        isError={isError}
        error={error}
      />

      <UsernameField
        value={formData.nim}
        onChange={handleUsernameChange}
        error={validationErrors.nim}
      />

      <PasswordField
        value={formData.password}
        onChange={handlePasswordChange}
        error={validationErrors.password}
        showPassword={showPassword}
        onToggleVisibility={togglePasswordVisibility}
      />

      <Button
        type="submit"
        disabled={isPending}
        className="ml-auto text-xs sm:text-sm h-9 sm:h-10 px-4 sm:px-6"
      >
        {isPending ? "Loading..." : "Login"}
      </Button>
    </form>
  );
}
