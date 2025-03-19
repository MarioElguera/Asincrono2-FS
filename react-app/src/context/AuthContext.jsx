import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const { VITE_API_URL } = import.meta.env;

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetch(`${VITE_API_URL}/user`, { headers: { Authorization: token } })
                .then(res => {
                    if (!res.ok) {
                        throw new Error("No se pudo obtener el usuario");
                    }
                    return res.json();
                })
                .then(data => setUser(data))
                .catch(() => setUser(null));
        }
    }, []);

    const login = async (email, password) => {
        try {
            const res = await fetch(`${VITE_API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (!res.ok) {
                throw new Error("Error en las credenciales o en el servidor");
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

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
