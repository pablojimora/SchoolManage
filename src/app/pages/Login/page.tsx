"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/login";

const LoginForm: React.FC = () => {
  const router = useRouter();

  // Estado controlado del formulario
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    const credentials = { userName, password };
    const response = await loginUser(credentials);

    // 🔍 Validar si hay error
    if (response.error) {
      setError(response.message || "Credenciales inválidas");
      return;
    }

    // ✅ Guardar información del usuario
    localStorage.setItem("token", response.token);
    localStorage.setItem("userName", response.userName);
    localStorage.setItem("role", response.role);

    console.log("✅ Login exitoso:", response);

    if (response.role === "Admin") {
      router.push("/pages/dashboardAdmin");
    } else {
      router.push("/pages/dashboardUsers");
    }
  } catch (err) {
    console.error("Error inesperado:", err);
    setError("Error al iniciar sesión");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded-2xl p-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Iniciar sesión
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Usuario</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Cargando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
