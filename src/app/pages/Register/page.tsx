"use client";

import { createUser } from "@/services/login";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const CreateUserForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    roleId: 1,
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "roleId" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      console.log("Datos enviados:", formData);
      const result = await createUser(formData);

      if (result.error) {
        setMessage(`❌ ${result.message}`);
      } else {
        setMessage("✅ Usuario creado con éxito");
        setFormData({
          userName: "",
          email: "",
          roleId: 1,
          password: "",
        });
      }
    } catch (error) {
      console.error(error)
      setMessage("❌ Error al crear usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-indigo-100 via-white to-blue-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-md flex flex-col shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-200"
      >
        <h2 className="text-3xl font-bold mb-4 text-center text-blue-700">
          Crear Usuario 👤
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Completa la información para registrar un nuevo usuario.
        </p>

        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">
            Nombre de usuario
          </label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Ej: juanperez"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">Correo</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="usuario@correo.com"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">Rol</label>
          <select
            name="roleId"
            value={formData.roleId}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value={1}>Admin</option>
            <option value={2}>Usuario</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-md mb-4"
        >
          {loading ? "Creando..." : "Crear usuario"}
        </button>

        <Link className="text-center" href={"/pages/Login"}>
          ¿Ya te registraste? <span className="text-blue-700 hover:underline">Iniciar Sesion</span>
        </Link>

        {message && (
          <p
            className={`mt-5 text-center text-sm font-medium ${
              message.startsWith("✅")
                ? "text-green-600 bg-green-50 border border-green-200"
                : "text-red-600 bg-red-50 border border-red-200"
            } p-2 rounded-xl`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default CreateUserForm;
