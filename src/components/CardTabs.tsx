import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface CardTabsProps {
  children: React.ReactNode;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

interface CardTabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface CardTabsTriggerProps {
  children: React.ReactNode;
  value: string;
  className?: string;
  disabled?: boolean;
}

interface CardTabsContentProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

interface CardTabsContextProps {
  value: string;
  defaultValue?: string;
  onValueChange: (value: string) => void;
}

const CardTabsContext = React.createContext<CardTabsContextProps>({
  value: "",
  defaultValue: "",
  onValueChange: () => {},
});

const useCardTabs = () => {
  const context = React.useContext(CardTabsContext);
  if (!context) {
    throw new Error("useCardTabs must be used within a CardTabs component");
  }
  return context;
};

const CardTabs = ({ children, defaultValue, value: controlledValue, onValueChange, className }: CardTabsProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue || "");

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleValueChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <CardTabsContext.Provider
      value={{
        value,
        defaultValue,
        onValueChange: handleValueChange,
      }}
    >
      <div className={cn("w-full", className)}>{children}</div>
    </CardTabsContext.Provider>
  );
};

const CardTabsList = ({ children, className }: CardTabsListProps) => {
  return (
    <div
      className={cn("inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-600", className)}
      role="tablist"
    >
      {children}
    </div>
  );
};

const CardTabsTrigger = ({ children, value: triggerValue, className, disabled = false }: CardTabsTriggerProps) => {
  const { value, onValueChange } = useCardTabs();
  const isActive = value === triggerValue;

  const handleClick = () => {
    if (!disabled) {
      onValueChange?.(triggerValue);
    }
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isActive ? "bg-white text-gray-900 shadow-sm" : "hover:bg-gray-200/80",
        className
      )}
      role="tab"
      aria-selected={isActive}
      aria-controls={`content-${triggerValue}`}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

const CardTabsContent = ({ children, value: contentValue, className }: CardTabsContentProps) => {
  const { value } = useCardTabs();
  const isActive = value === contentValue;

  if (!isActive) return null;

  return (
    <div
      className={cn("mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2", className)}
      role="tabpanel"
      id={`content-${contentValue}`}
      aria-labelledby={`trigger-${contentValue}`}
      tabIndex={0}
    >
      {children}
    </div>
  );
};

export { CardTabs, CardTabsList, CardTabsTrigger, CardTabsContent, useCardTabs };
