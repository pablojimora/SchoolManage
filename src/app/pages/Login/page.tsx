"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/login";

const LoginForm: React.FC = () => {
  const router = useRouter();

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

      if (response.error) {
        setError(response.message || "Credenciales inválidas");
        return;
      }

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
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-blue-100 via-white to-blue-200">
      <form
        onSubmit={handleLogin}
        className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-200"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Bienvenido 👋
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Ingresa tus credenciales para acceder al panel.
        </p>

        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">Usuario</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Tu nombre de usuario"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="••••••••"
            required
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center bg-red-50 p-2 rounded-lg border border-red-200">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
        >
          {loading ? "Cargando..." : "Ingresar"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          ¿No tienes cuenta?{" "}
          <a
            href="/pages/Register"
            className="text-blue-600 font-medium hover:underline"
          >
            Regístrate aquí
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
