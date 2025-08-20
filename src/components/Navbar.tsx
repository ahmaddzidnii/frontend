import { PiListBold } from "react-icons/pi";
import { RiCloseLine } from "react-icons/ri";

import { Logo } from "./Logo";
import { Button } from "./ui/button";

interface NavbarProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export const Navbar = ({ onToggleSidebar, isSidebarOpen }: NavbarProps) => {
  return (
    <header className="bg-white h-16 shadow flex items-center justify-between px-3  py-2.5 fixed top-0 left-0 right-0 z-[9999999]">
      <Logo className="h-24 aspect-video" />
      <span className="font-semibold text-lg uppercase text-[#9E927B] hidden md:block">Kartu Rencana Studi</span>
      {/* <span className="font-semibold text-lg uppercase text-[#9E927B]  md:hidden">KRS</span> */}
      <div className="lg:hidden">
        <Button
          className="rounded-full! aspect-square p-0 size-10"
          onClick={onToggleSidebar}
        >
          {isSidebarOpen ? <RiCloseLine /> : <PiListBold />}
        </Button>
      </div>
    </header>
  );
};
