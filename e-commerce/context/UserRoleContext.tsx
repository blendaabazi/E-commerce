"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useUser } from "@clerk/nextjs";

type UserRoleContextType = {
  role: string | null;
  isAdmin: boolean;
  isLoading: boolean;
};

const UserRoleContext = createContext<UserRoleContextType>({
  role: null,
  isAdmin: false,
  isLoading: true,
});

export const UserRoleProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoaded } = useUser();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded && user) {
      const metadataRole = user.publicMetadata?.role as string | undefined;
      setRole(metadataRole ?? null);
    }
  }, [isLoaded, user]);

  const isAdmin = role === "admin";

  return (
    <UserRoleContext.Provider value={{ role, isAdmin, isLoading: !isLoaded }}>
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = () => useContext(UserRoleContext);
