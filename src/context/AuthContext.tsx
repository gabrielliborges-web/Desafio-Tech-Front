import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import type { LoginRequest, SignupRequest } from "../types/auth";
import { loginRequest, signupRequest } from "../lib/auth";
import toast from "react-hot-toast";
import type { User } from "../types/user";

interface AuthContextProps {
    user: User | null;
    isAuthenticated: boolean;
    login: (data: LoginRequest) => Promise<void>;
    signup: (data: SignupRequest) => Promise<void>;
    logout: () => void;
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false)
    }, []);

    useEffect(() => {
        if (!loading && user && location.pathname === "/login") {
            navigate("/movies", { replace: true });
        }
    }, [user, loading, location.pathname, navigate]);


    const login = async (data: LoginRequest) => {
        try {
            const res = await loginRequest(data);
            setUser(res.user);
            localStorage.setItem("user", JSON.stringify(res.user));
            localStorage.setItem("token", res.token);
            toast.success("Login realizado com sucesso!");
            navigate("/movies");
        } catch (err: any) {
            console.error("Erro no login:", err);
            toast.error(err.message);
        }
    };

    const signup = async (data: SignupRequest) => {
        try {
            const res = await signupRequest(data);
            setUser(res.user);
            localStorage.setItem("user", JSON.stringify(res.user));
            localStorage.setItem("token", res.token);
            toast.success("Conta criada com sucesso!");
            navigate("/movies");
        } catch (err: any) {
            console.error("Erro no cadastro:", err);
            toast.error(err.message || "Erro ao cadastrar usuário");
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout, setUser }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider");
    return context;
}
