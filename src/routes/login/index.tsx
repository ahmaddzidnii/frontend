import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AuthLayout } from "@/layout/AuthLayout";
import { createFileRoute } from "@tanstack/react-router";
import { EyeIcon, EyeOffIcon, LockIcon, UserIcon } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/login/")({
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
  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center w-full h-full gap-5">
        <div className="flex items-center gap-2">
          <img
            className="size-16 aspect-square"
            src="/uinsk-logo.png"
          />
          <img
            className="w-full h-16 aspect-video"
            src="/uinsk-tulisan.png"
          />
        </div>
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
            <FormComponent />
          </CardContent>
        </Card>
        <p className="text-muted-foreground text-xs text-center">
          Copyright © {new Date().getFullYear()} <span className="font-bold">PTIPD - UIN Sunan Kalijaga.</span> All rights reserved.
        </p>
      </div>
    </AuthLayout>
  );
}

function FormComponent() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col space-y-2">
        <label
          htmlFor="username"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Username
        </label>
        <div className="relative flex items-center">
          <input
            id="username"
            type="text"
            placeholder="Masukkan username Anda"
            className="flex h-10 w-full rounded-[5px] border border-gray-300  bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#105E15] pr-13"
          />
          <div className="absolute inset-y-0 right-0 flex items-center px-3 border rounded-e-[5px]  pointer-events-none bg-[#EAEBEC]">
            <UserIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
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
            type={showPassword ? "text" : "password"}
            placeholder="Masukkan password Anda"
            className="flex h-10 w-full rounded-[5px] border border-gray-300  bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#105E15] pr-20"
          />
          <div className="absolute inset-y-0 right-10 flex items-center pr-3">
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="p-1.5 rounded-full hover:bg-gray-200 "
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOffIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center border rounded-e-[5px]  px-3 bg-[#EAEBEC]">
            <LockIcon className="h-5 w-5 text-gray-400  pointer-events-none" />
          </div>
        </div>
      </div>

      <Button className="ml-auto">Login</Button>
    </form>
  );
}
