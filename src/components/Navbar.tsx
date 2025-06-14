export const Navbar = () => {
  return (
    <header className="bg-white shadow flex items-center justify-between px-3  py-2.5 fixed top-0 left-0 right-0 z-50">
      <img
        className="size-10 aspect-square"
        src="/uinsk-logo.png"
        alt="logo"
      />
      <span className="font-semibold text-lg uppercase text-[#9E927B]">Kartu Rencana Studi</span>
    </header>
  );
};
