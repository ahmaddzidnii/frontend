import React, { useEffect } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getSessionData } from "@/api/get-session";
import { authKeys } from "@/lib/query-keys";

interface User {
  id: string;
  name: string;
  nim: string;
}

export interface AuthContextType {
  status: "pending" | "authenticated" | "unauthenticated";
  user: User | null;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, isLoading } = useSuspenseQuery({
    queryKey: authKeys.me(),
    queryFn: async () => {
      const session = await getSessionData();
      return session;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const status = React.useMemo(() => {
    if (data) return "authenticated";
    return "unauthenticated";
  }, [data]);

  const value: AuthContextType = {
    status,
    user: data,
  };

  useEffect(() => {
    if (!data) {
      localStorage.removeItem("session_id");
    }
  }, [data]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
