import { MenuIcon } from "lucide-react";
import { FaListCheck } from "react-icons/fa6";
import { FaClipboard, FaHome, FaSignOutAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "@tanstack/react-router";

import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { SidebarButton } from "@/components/SidebarButton";
import { useConfirmation } from "@/hooks/useConfirmDialog";
import { useAuth } from "@/context/AuthContext";
import { getInitials } from "@/lib/get-inisial";
import { useLogout } from "@/hooks/auth/useLogout";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useLogout();

  const pathname = location.pathname;

  const { confirm } = useConfirmation();

  const handleLogout = async () => {
    const isConfirmed = await confirm({
      message: "Apakah Anda yakin ingin keluar dari Kartu Rencana Studi?",
      confirmText: "Keluar",
      onConfirm: () => {
        return logout.mutateAsync();
      },
    });

    if (!isConfirmed) return;
  };
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto flex pt-20 min-h-screen">
        <aside className="bg-white shadow w-72 shrink-0 ">
          <div className="relative h-[52px] flex items-center pl-5">
            <span className="font-bold">Navigasi</span>

            <Button
              className="absolute top-0 right-0 size-[52px]"
              variant="ghost"
            >
              <MenuIcon />
            </Button>
          </div>
          <div className="p-4">
            <div className="border flex items-center justify-center flex-col p-5 rounded-[5px]">
              <span className="text-[100px] font-bold text-[#105E15]">{getInitials(user?.name || "Ahmad Zidni Hidayat")}</span>
              <div className="text-center">
                <p className="font-semibold uppercase">{user?.name || "Ahmad Zidni Hidayat"}</p>
                <p>{user?.nim || "23106050077"}</p>
              </div>
            </div>
          </div>

          {/* Menu */}
          <div className="mt-5 ">
            <SidebarButton
              icon={FaHome}
              isActive={pathname === "/dash"}
              label="Dashboard"
              onClick={() => {
                navigate({ to: "/dash" });
              }}
            />
            <SidebarButton
              icon={FaListCheck}
              isActive={pathname.startsWith("/krs/pengisian")}
              label="Isi KRS"
              onClick={() => {
                navigate({ to: "/krs/pengisian" });
              }}
            />
            <SidebarButton
              icon={FaClipboard}
              isActive={pathname.startsWith("/krs/lihat")}
              label="Lihat KRS"
              onClick={() => {
                navigate({ to: "/krs/lihat" });
              }}
            />
            <SidebarButton
              icon={FaSignOutAlt}
              isActive={false}
              label="Logout"
              onClick={handleLogout}
            />
          </div>
        </aside>
        <main className="flex-1 flex flex-col">{children}</main>
      </div>
      <footer className="shadow w-full p-4 flex items-center justify-center mt-5">
        <p className="text-muted-foreground text-xs ">
          Copyright © {new Date().getFullYear()} <span className="font-bold">PTIPD - UIN Sunan Kalijaga.</span> All rights reserved.
        </p>
      </footer>
    </>
  );
};
