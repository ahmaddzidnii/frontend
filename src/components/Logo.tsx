import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

interface LogoProps {
  className?: string;
}
export const Logo = ({ className }: LogoProps) => {
  return (
    <Link
      to="/"
      className={cn("flex items-center", className)}
    >
      <img
        src="/logo-uin.png"
        alt="/logo-uin"
      />
    </Link>
  );
};
