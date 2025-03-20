import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const { VITE_API_URL } = import.meta.env;

    // console.log("VITE_API_URL => ", VITE_API_URL);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const res = await fetch(`${VITE_API_URL}/user`, {
                    headers: { Authorization: token },
                });

                if (!res.ok) {
                    throw new Error("No se pudo obtener el usuario");
                }

                const data = await res.json();
                setUser(data);

            } catch (error) {
                console.error("AuthContext | Error obteniendo usuario:", error);
                setUser(null);
            }
        };

        fetchUser();
    }, []);

    const login = async (email, password) => {
        try {
            const res = await fetch(`${VITE_API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Error en el login");
            }

            const data = await res.json();
            localStorage.setItem("token", data.token);
            setUser(data.user);

            return data.user;

        } catch (error) {
            console.error("AuthContext | Error en el login:", error);
            setUser(null);
            throw error;
        }
    };

    const register = async (username, email, password) => {
        try {
            const res = await fetch(`${VITE_API_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Error en el registro");
            }

            return await res.json();

        } catch (error) {
            console.error("AuthContext | Error en el registro:", error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
