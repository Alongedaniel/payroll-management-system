import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { User as FirebaseUser } from "firebase/auth";
import { auth } from "@/config/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: "admin" | "hr" | "payroll" | "finance";
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const storedUser = localStorage.getItem("user");
        let role: User["role"] = "admin";

        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            role = parsedUser.role || "admin";
          } catch {
            role = "admin";
          }
        }

        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          role,
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: result.user.email,
          role: "admin",
        })
      );
      setUser({
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        role: "admin",
      });
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (email: string, password: string, displayName: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: result.user.email,
          displayName,
          role: "admin",
        })
      );
      setUser({
        uid: result.user.uid,
        email: result.user.email,
        displayName,
        role: "admin",
      });
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
