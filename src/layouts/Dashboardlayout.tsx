import { FaListCheck } from "react-icons/fa6";
import { useState, useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { FaClipboard, FaHome, FaSignOutAlt } from "react-icons/fa";

import { Navbar } from "@/components/Navbar";
import { getInitials } from "@/lib/get-inisial";
import { useAuth } from "@/context/AuthContext";
import { useLogout } from "@/hooks/auth/useLogout";
import { useConfirmation } from "@/hooks/useConfirmDialog";
import { SidebarButton } from "@/components/SidebarButton";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useLogout();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const pathname = location.pathname;
  const { confirm } = useConfirmation();

  useLayoutEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1181; // lg breakpoint
      setIsMobile(mobile);

      // Auto close sidebar on mobile when switching from desktop
      if (!mobile) {
        setIsSidebarOpen(false);
      }
    };

    // Set initial state
    handleResize();
    setIsInitialized(true);

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    if (!isInitialized) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && isSidebarOpen) {
        const sidebar = document.getElementById("sidebar");
        const menuButton = document.getElementById("menu-button");

        if (sidebar && !sidebar.contains(event.target as Node) && menuButton && !menuButton.contains(event.target as Node)) {
          setIsSidebarOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, isSidebarOpen, isInitialized]);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile && isInitialized) {
      setIsSidebarOpen(false);
    }
  }, [pathname, isMobile, isInitialized]);

  // Disable body scroll when sidebar open
  useEffect(() => {
    if (!isInitialized) return;

    if (isSidebarOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen, isMobile, isInitialized]);

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Don't render until initialized to avoid flickering
  if (!isInitialized || isMobile === null) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#105E15]"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar
        onToggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="max-w-7xl mx-auto flex pt-20 min-h-screen rounded-2xl relative">
        <aside
          id="sidebar"
          className={`
            bg-white shadow shrink-0 rounded-none z-50 pt-16 lg:pt-0
            ${isMobile ? "fixed left-0 top-0 bottom-0 w-full h-full" : "w-72 static rounded-l-xl"}
            ${isMobile && !isSidebarOpen ? "-translate-x-full" : "translate-x-0"}
            transition-transform duration-300 ease-in-out
          `}
        >
          <div className="relative h-[52px] flex items-center pl-5">
            <span className="font-bold">Navigasi</span>
          </div>

          <div className="p-4">
            <div className="border flex items-center justify-center flex-col p-5 rounded-[5px]">
              <span className="text-[100px] font-bold text-[#105E15]">{getInitials(user?.name || "Ahmad Zidni Hidayat")}</span>
              <div className="text-center">
                <p className="font-semibold uppercase text-[#777777]">{user?.name || "Ahmad Zidni Hidayat"}</p>
                <p className="text-[#777777] text-[13px]">{user?.nim || "23106050077"}</p>
              </div>
            </div>
          </div>

          {/* Menu */}
          <div className="mt-5 text-[#777777] text-sm">
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

        {/* Mobile menu button - floating button when sidebar is closed */}

        <main className={`flex-1 flex flex-col ${isMobile ? "w-full" : ""}`}>{children}</main>
      </div>

      <footer className="shadow w-full p-4 flex items-center justify-center mt-5 bg-white">
        <p className="text-muted-foreground text-xs">
          Copyright © {new Date().getFullYear()} <span className="font-bold">PTIPD - UIN Sunan Kalijaga.</span> All rights reserved.
        </p>
      </footer>
    </>
  );
};
