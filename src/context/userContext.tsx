import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { UserContext } from "./userContextValue";

// Create a custom hook to use the UserContext 
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userName, setUserName] = useState("");

  // Sync from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed.firstName) setUserName(parsed.firstName);
      } catch {
        console.warn("Failed to parse stored user");
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};
