import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

// function App() {
//   const [mensaje, setMensaje] = useState("");

//   const { VITE_API_URL } = import.meta.env;
//   console.log("API URL:", VITE_API_URL);

//   useEffect(() => {
//     fetch(VITE_API_URL)
//       .then((res) => res.json())
//       .then((data) => setMensaje(data.mensaje))
//       .catch((error) => console.error("Error:", error));
//   }, []);

//   return (
//     <div className="p-5 text-center">
//       <h1 className="text-2xl font-bold">Frontend con React + Vite</h1>
//       <p className="mt-2 text-lg">{mensaje}</p>
//     </div>
//   );
// }

// export default App;
