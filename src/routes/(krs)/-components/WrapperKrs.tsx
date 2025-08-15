interface WrapperKrsProps {
  children: React.ReactNode;
  title: string;
}

export const WrapperKrs = ({ children, title }: WrapperKrsProps) => {
  return (
    <div className="rounded-r-xl overflow-hidden shadow h-full">
      <header className="bg-white shadow  w-full">
        <nav className="px-3 py-2.5 border-b-4 w-max border-b-[#105E15] ">
          <span className="text-xl">{title}</span>
        </nav>
      </header>
      <div className="shadow flex-1 h-full p-10 flex flex-col gap-5 bg-[#ecedf1c7]">{children}</div>
    </div>
  );
};
