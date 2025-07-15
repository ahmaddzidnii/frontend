import React, { createContext, useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AlertOptions {
  title?: string;
  message: React.ReactNode;
  variant?: "success" | "error";
}

interface AlertDialogContextType {
  showAlert: (options: AlertOptions) => void;
}

const AlertDialogContext = createContext<AlertDialogContextType | undefined>(undefined);

export const useAlertDialog = () => {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error("useAlertDialog must be used within an AlertDialogProvider");
  }
  return context;
};

export const AlertDialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<AlertOptions>({ title: "", message: "", variant: "success" });

  const showAlert = (alertOptions: AlertOptions) => {
    setOptions({
      variant: "success",
      ...alertOptions,
    });
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <AlertDialogContext.Provider value={{ showAlert }}>
      {children}

      {/* Modal Component */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div
            className={cn(
              "bg-white rounded-[5px] p-5 max-w-xl w-full mx-4 shadow-xl border-t-6 ",
              options.variant === "success" ? "border-green-400" : "border-red-400"
            )}
          >
            <div className="mb-4">
              <h3 className="  mb-2 text-2xl">Pemberitahuan</h3>
              {options.message ? (
                <div className="text-muted-foreground text-sm">{options.message}</div>
              ) : (
                <div className="text-muted-foreground text-sm">Kelas berhasil diambil</div>
              )}
            </div>
            {options.variant === "error" && (
              <div className="mb-4 text-sm text-muted-foreground">
                <span>
                  <strong>Keterangan :</strong>
                </span>
                <p className="uppercase italic mt-1 text-xs">MAAF, DATA MATA KULIAH SUDAH ADA DI ISIAN KRS</p>
              </div>
            )}
            <div className="flex justify-end space-x-3 ">
              <Button
                onClick={handleClose}
                variant={"secondary"}
                className="uppercase"
              >
                OK
              </Button>
            </div>
          </div>
        </div>
      )}
    </AlertDialogContext.Provider>
  );
};
