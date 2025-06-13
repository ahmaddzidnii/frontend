interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <div className="w-full min-h-screen flex items-center justify-center">{children}</div>;
};
