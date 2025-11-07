"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white shadow-md rounded-2xl p-10 w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Bienvenido al Panel Escolar
        </h1>
        <p className="text-gray-600 mb-8">
          Administra estudiantes, usuarios y cursos de manera eficiente.  
          Accede como <span className="font-semibold text-blue-600">Administrador</span> o crea una cuenta nueva para comenzar.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => router.push("/pages/Login")}
            className="w-full sm:w-auto bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            Iniciar sesión
          </button>

          <button
            onClick={() => router.push("/pages/Register")}
            className="w-full sm:w-auto border border-blue-600 text-blue-600 py-2 px-6 rounded-lg hover:bg-blue-50 transition"
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
}
