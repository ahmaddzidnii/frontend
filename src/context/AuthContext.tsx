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
  diluarJadwalPengisian?: {
    yes: boolean;
    messageFromBackend: string;
  };
  diluarJamPengisian?: {
    yes: boolean;
    messageFromBackend: string;
  };
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

  const isDiluarJadwal = useMemo(() => {
    return isErrorData(data) && data.error_code === "Akses aplikasi saat ini sedang dinonaktifkan karena bukan masa pengisian KRS.";
  }, [data]);

  const isDiluarJam = useMemo(() => {
    return isErrorData(data) && data.error_code.startsWith("KRS hanya dapat diakses antara jam");
  }, [data]);

  useEffect(() => {
    if (data === null) {
      localStorage.removeItem("session_id");
    }
  }, [data, isDiluarJadwal, isDiluarJam]);

  const value: AuthContextType = {
    status,
    user,
    diluarJadwalPengisian: {
      yes: isDiluarJadwal,
      messageFromBackend: isErrorData(data) ? data.error_code : "",
    },
    diluarJamPengisian: {
      yes: isDiluarJam,
      messageFromBackend: isErrorData(data) ? data.error_code : "",
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
