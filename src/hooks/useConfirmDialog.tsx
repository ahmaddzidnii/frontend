import { Button } from "@/components/ui/button";
import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Perbarui Interface
interface ConfirmationOptions {
  title?: string;
  message: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "warning" | "info";
  onConfirm?: () => Promise<any>; // Fungsi async saat konfirmasi
}

interface ConfirmationContextType {
  confirm: (options: ConfirmationOptions) => Promise<boolean>;
}

const ConfirmationContext = createContext<ConfirmationContextType | undefined>(undefined);

interface ConfirmationProviderProps {
  children: React.ReactNode;
}

export const ConfirmationProvider: React.FC<ConfirmationProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmationOptions>({
    message: "Apakah Anda yakin?",
  });
  const [resolver, setResolver] = useState<((value: boolean) => void) | null>(null);
  // 2. Tambahkan state untuk loading
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const confirm = (confirmOptions: ConfirmationOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setOptions({
        title: "Konfirmasi",
        confirmText: "Ya",
        cancelText: "Batal",
        type: "info",
        ...confirmOptions,
      });
      setIsOpen(true);
      setResolver(() => resolve);
    });
  };

  // 3. Ubah handleConfirm menjadi async dan kelola loading state
  const handleConfirm = async () => {
    if (!options.onConfirm) {
      if (resolver) {
        resolver(true);
      }
      closeModal();
      return;
    }

    setIsLoading(true);
    try {
      await options.onConfirm(); // Jalankan fungsi async
      if (resolver) {
        resolver(true); // Kirim status sukses
      }
      closeModal();
    } catch (error) {
      console.error("Confirmation onConfirm failed:", error);
      if (resolver) {
        resolver(false); // Kirim status gagal
      }

      closeModal();
    } finally {
      setIsLoading(false); // Selalu set loading ke false di akhir
    }
  };

  const handleCancel = () => {
    if (resolver) {
      resolver(false);
    }
    closeModal();
  };

  const closeModal = () => {
    setIsOpen(false);
    setResolver(null);
    setIsLoading(false); // Pastikan loading state di-reset
  };
  return (
    <ConfirmationContext.Provider value={{ confirm }}>
      {children}

      {/* Modal Component */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-[5px] p-5 max-w-xl w-full mx-4 shadow-xl">
            <div className="mb-4">
              <h3 className="mb-2 text-2xl">Konfirmasi</h3>
              {options.message ? (
                <div className="text-muted-foreground text-sm">{options.message}</div>
              ) : (
                <div className="text-muted-foreground text-sm">Apakah Anda yakin?</div>
              )}
            </div>

            <div className="flex justify-end space-x-3 ">
              <Button
                onClick={handleConfirm}
                variant={"default"}
                className="uppercase"
                disabled={isLoading}
                role={isLoading ? "status" : "button"}
              >
                {options.confirmText}
              </Button>
              <Button
                onClick={handleCancel}
                className="px-4 py-2 uppercase"
                variant="secondary"
                disabled={isLoading}
              >
                {options.cancelText}
              </Button>
            </div>
          </div>
        </div>
      )}
    </ConfirmationContext.Provider>
  );
};

export const useConfirmation = () => {
  const context = useContext(ConfirmationContext);

  if (!context) {
    throw new Error("useConfirmation must be used within a ConfirmationProvider");
  }

  return context;
};

export default ConfirmationContext;
