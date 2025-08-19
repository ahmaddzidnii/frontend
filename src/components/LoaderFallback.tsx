import { cn } from "@/lib/utils";

interface LoaderFallbackProps {
  className?: string;
}

export const LoaderFallback = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center -mt-24">
        <div className="relative">
          <img
            src="/gif-pesawat.gif"
            alt="Animasi pesawat terbang"
            className="w-96 h-96 object-contain"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-20">
            <h1 className="text-2xl font-semibold g">Sedang Memuat Aplikasi</h1>
            <p className="text-gray-600 text-base">Mohon bersabar sebentar...</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export const LoaderFallback2 = ({ className }: LoaderFallbackProps) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <svg
        className="size-10 fill-[#105E15]"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style
          dangerouslySetInnerHTML={{
            __html:
              ".spinner_LWk7{animation:spinner_GWy6 1.2s linear infinite,spinner_BNNO 1.2s linear infinite}.spinner_yOMU{animation:spinner_GWy6 1.2s linear infinite,spinner_pVqn 1.2s linear infinite;animation-delay:.15s}.spinner_KS4S{animation:spinner_GWy6 1.2s linear infinite,spinner_6uKB 1.2s linear infinite;animation-delay:.3s}.spinner_zVee{animation:spinner_GWy6 1.2s linear infinite,spinner_Qw4x 1.2s linear infinite;animation-delay:.45s}@keyframes spinner_GWy6{0%,50%{width:9px;height:9px}10%{width:11px;height:11px}}@keyframes spinner_BNNO{0%,50%{x:1.5px;y:1.5px}10%{x:.5px;y:.5px}}@keyframes spinner_pVqn{0%,50%{x:13.5px;y:1.5px}10%{x:12.5px;y:.5px}}@keyframes spinner_6uKB{0%,50%{x:13.5px;y:13.5px}10%{x:12.5px;y:12.5px}}@keyframes spinner_Qw4x{0%,50%{x:1.5px;y:13.5px}10%{x:.5px;y:12.5px}}",
          }}
        />
        <rect
          className="spinner_LWk7"
          x="1.5"
          y="1.5"
          rx={1}
          width={9}
          height={9}
        />
        <rect
          className="spinner_yOMU"
          x="13.5"
          y="1.5"
          rx={1}
          width={9}
          height={9}
        />
        <rect
          className="spinner_KS4S"
          x="13.5"
          y="13.5"
          rx={1}
          width={9}
          height={9}
        />
        <rect
          className="spinner_zVee"
          x="1.5"
          y="13.5"
          rx={1}
          width={9}
          height={9}
        />
      </svg>
    </div>
  );
};
