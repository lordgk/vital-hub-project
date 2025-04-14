
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  userName: string | null;
  login: (email: string, name?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is authenticated on mount
    const authStatus = localStorage.getItem("isAuthenticated");
    const storedEmail = localStorage.getItem("userEmail");
    const storedName = localStorage.getItem("userName");
    
    if (authStatus === "true" && storedEmail) {
      setIsAuthenticated(true);
      setUserEmail(storedEmail);
      setUserName(storedName);
    }
  }, []);

  const login = (email: string, name?: string) => {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userEmail", email);
    if (name) {
      localStorage.setItem("userName", name);
    }
    setIsAuthenticated(true);
    setUserEmail(email);
    if (name) {
      setUserName(name);
    }
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    setIsAuthenticated(false);
    setUserEmail(null);
    setUserName(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
