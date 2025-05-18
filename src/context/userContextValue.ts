import { createContext } from "react";

export interface UserContextType {
  userName: string;
  setUserName: (name: string) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);