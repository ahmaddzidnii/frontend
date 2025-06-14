interface AlertProps {
  children?: React.ReactNode;
}

export const Alert = ({ children }: AlertProps) => {
  return <div className="rounded-[5px] bg-[#D2EBF0] text-foreground text-start p-5">{children}</div>;
};
