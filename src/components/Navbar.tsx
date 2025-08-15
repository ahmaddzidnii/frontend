import { Logo } from "./Logo";

export const Navbar = () => {
  return (
    <header className="bg-white h-16 shadow flex items-center justify-between px-3  py-2.5 fixed top-0 left-0 right-0 z-[9999999]">
      <Logo className="h-24 aspect-video" />
      <span className="font-semibold text-lg uppercase text-[#9E927B]">Kartu Rencana Studi</span>
    </header>
  );
};
