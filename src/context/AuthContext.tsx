import React from "react";
import { useQuery } from "@tanstack/react-query";
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
  const { data: user, isLoading } = useQuery({
    queryKey: authKeys.me(),
    queryFn: async () => {
      const session = await getSessionData();
      return {
        id: session.data.id_mahasiswa,
        name: session.data.nama,
        nim: session.data.nim,
      };
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const status = React.useMemo(() => {
    if (isLoading) return "pending";
    if (user) return "authenticated";
    return "unauthenticated";
  }, [isLoading, user]);

  const value: AuthContextType = {
    status,
    user: user || null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
