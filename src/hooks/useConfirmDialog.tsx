import { Button } from "@/components/ui/button";
import React, { createContext, useContext, useState } from "react";

interface ConfirmationOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "warning" | "info";
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
    message: "",
    title: "Konfirmasi",
    confirmText: "Ya",
    cancelText: "Batal",
    type: "info",
  });
  const [resolver, setResolver] = useState<((value: boolean) => void) | null>(null);

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

  const handleConfirm = () => {
    if (resolver) {
      resolver(true);
    }
    closeModal();
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
  };

  return (
    <ConfirmationContext.Provider value={{ confirm }}>
      {children}

      {/* Modal Component */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{options.title}</h3>
              <p className="text-gray-600">{options.message}</p>
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                onClick={handleConfirm}
                variant={"default"}
              >
                {options.confirmText}
              </Button>
              <Button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
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
