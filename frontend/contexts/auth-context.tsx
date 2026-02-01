"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useRef } from "react";
import { useRouter } from "next/navigation";
import { api, authApi } from "@/lib/api";

export interface User {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    role: "ADMIN" | "LANDLORD" | "TENANT";
    phone: string | null;
    profileImage: string | null;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (data: { email: string; password: string; firstName: string; lastName: string; phone: string }) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const authCheckRef = useRef<NodeJS.Timeout | null>(null);

    const checkAuth = async () => {
        // Clear any pending auth check
        if (authCheckRef.current) {
            clearTimeout(authCheckRef.current);
        }

        try {
            const { data } = await authApi.me();
            setUser(data.user);
        } catch {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Debounce the initial auth check to prevent rapid calls
        authCheckRef.current = setTimeout(() => {
            checkAuth();
        }, 100);

        return () => {
            if (authCheckRef.current) {
                clearTimeout(authCheckRef.current);
            }
        };
    }, []);

    const login = async (email: string, password: string) => {
        const response = await authApi.login(email, password);
        const { user: userData } = response.data;

        setUser(userData);

        // Redirect based on role
        switch (userData.role) {
            case "ADMIN":
                router.push("/admin");
                break;
            case "LANDLORD":
                router.push("/landlord");
                break;
            default:
                router.push("/dashboard");
        }
    };

    const register = async (data: { email: string; password: string; firstName: string; lastName: string; phone: string }) => {
        const response = await authApi.register(data);
        const { user: userData } = response.data;

        setUser(userData);

        // Redirect to dashboard
        router.push("/dashboard");
    };

    const logout = async () => {
        try {
            await authApi.logout();
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            setUser(null);
            router.push("/login");
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
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
