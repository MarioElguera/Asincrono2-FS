import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user) {
        navigate("/");
        return null;
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
                    Bienvenido, {user.username}
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                    Estás conectado y puedes acceder a la plataforma.
                </p>
                <button
                    onClick={logout}
                    className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
};

export default Home;
