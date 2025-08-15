import { ChevronRight, MenuIcon } from "lucide-react";
import { FaListCheck } from "react-icons/fa6";
import { FaClipboard, FaHome, FaSignOutAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";

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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const pathname = location.pathname;
  const { confirm } = useConfirmation();

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint
      setIsMobile(mobile);

      // Auto close sidebar on mobile when switching from desktop
      if (!mobile) {
        setIsSidebarOpen(false);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
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
  }, [isMobile, isSidebarOpen]);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [pathname, isMobile]);

  // Disable body scroll saat sidebar open
  useEffect(() => {
    if (isSidebarOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen, isMobile]);

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

  return (
    <>
      <Navbar />

      {/* Mobile overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="max-w-7xl mx-auto flex pt-20 min-h-screen rounded-2xl relative">
        <aside
          id="sidebar"
          className={`
    bg-white shadow shrink-0 rounded-none z-50 pt-16 md:pt-0
    ${isMobile ? "fixed left-0 top-0 bottom-0 w-full h-full" : "w-72 static rounded-l-xl"}
    ${isMobile && !isSidebarOpen ? "-translate-x-full" : "translate-x-0"}
    transition-transform duration-300 ease-in-out
  `}
        >
          <div className="relative h-[52px] flex items-center pl-5">
            <span className="font-bold">Navigasi</span>

            <Button
              id="menu-button"
              className="absolute top-0 right-0 size-[52px] lg:hidden"
              variant="ghost"
              onClick={toggleSidebar}
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
          <div className="mt-5">
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

        {/* Mobile menu button - only show when sidebar is closed */}
        {/* {isMobile && !isSidebarOpen && (
          <Button
            className="fixed top-[5.5rem] left-4 z-40 lg:hidden shadow-lg"
            variant="default"
            size="sm"
            onClick={toggleSidebar}
          >
            <MenuIcon className="w-4 h-4" />
          </Button>
        )} */}

        {isMobile && !isSidebarOpen && (
          <button
            className="group fixed top-1/2 left-0 transform -translate-y-1/2 z-40 lg:hidden
             bg-gradient-to-r from-[#105E1] to-green-700 text-white
             rounded-r-full shadow-2xl hover:shadow-green-500/25
             transition-all duration-300 ease-out hover:scale-110 hover:translate-x-1"
            onClick={toggleSidebar}
          >
            <div className="flex items-center justify-center py-4 px-3">
              <div className="transform transition-transform duration-300 ease-out group-hover:translate-x-2 group-hover:scale-105">
                <ChevronRight className="w-6 h-6" />
              </div>
            </div>

            {/* Glow effect */}
            <div
              className="absolute inset-0 rounded-r-full
                  bg-gradient-to-r from-green-400 to-green-600
                  opacity-0 group-hover:opacity-20
                  transition-opacity duration-300 blur-md"
            ></div>
          </button>
        )}

        <main
          className={`
          flex-1 flex flex-col
          ${isMobile ? "w-full" : ""}
        `}
        >
          {children}
        </main>
      </div>

      <footer className="shadow w-full p-4 flex items-center justify-center mt-5 bg-white">
        <p className="text-muted-foreground text-xs">
          Copyright © {new Date().getFullYear()} <span className="font-bold">PTIPD - UIN Sunan Kalijaga.</span> All rights reserved.
        </p>
      </footer>
    </>
  );
};
