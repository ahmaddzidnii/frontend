import React, { useEffect, useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { authKeys } from "@/lib/query-keys";
import { getSessionData, type GetSessionError, type GetSessionResult } from "@/api/get-session";

interface User {
  id: string;
  name: string;
  nim: string;
}

export interface AuthContextType {
  status: "pending" | "authenticated" | "unauthenticated";
  user: User | null;
  isDalamJadwal?: boolean;
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
  const { data } = useSuspenseQuery({
    queryKey: authKeys.me(),
    queryFn: getSessionData,
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const isErrorData = (data: GetSessionResult): data is GetSessionError => {
    return !!data && "error_code" in data;
  };

  const user: User | null = useMemo(() => {
    if (!data || isErrorData(data)) return null;
    return {
      id: data.id,
      name: data.name,
      nim: data.nim,
    };
  }, [data]);

  const status: AuthContextType["status"] = useMemo(() => {
    return user ? "authenticated" : "unauthenticated";
  }, [user]);

  const isDalamJadwal = useMemo(() => {
    return !(isErrorData(data) && data.error_code === "KRS_SCHEDULE_NOT_ALLOWED");
  }, [data]);

  useEffect(() => {
    if (data === null) {
      localStorage.removeItem("session_id");
    }
  }, [data, isDalamJadwal]);

  const value: AuthContextType = {
    status,
    user,
    isDalamJadwal,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
