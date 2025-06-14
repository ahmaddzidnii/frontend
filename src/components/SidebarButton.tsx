import { cn } from "@/lib/utils";
import type { IconType } from "react-icons";
import { type LucideIcon } from "lucide-react";

interface SidebarButtonProps {
  onClick?: () => void;
  isActive: boolean;
  icon: LucideIcon | IconType;
  label: string;
}

export const SidebarButton = ({ icon, isActive, label, onClick }: SidebarButtonProps) => {
  const IconComponent = icon;
  return (
    <div className={cn("border-l-4 border-l-transparent w-full", isActive && "border-l-[#105E15] text-[#105E15]")}>
      <button
        onClick={onClick}
        className="flex h-12 items-center px-5 cursor-pointer w-full"
      >
        <IconComponent className={cn("size-4 mr-2", isActive && "fill-[#105E15]")} />
        <span className="text-sm w-full text-start">{label}</span>
      </button>
    </div>
  );
};
