'use client';
import { createUser } from "@/services/login";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // El select devuelve siempre strings, pero el servicio espera roleId como número.
    // Convertimos roleId a número aquí para mantener los tipos correctos.
    setFormData((prev) => ({
      ...prev,
      [name]: name === "roleId" ? Number(value) : value,
    }));
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  console.log("Datos enviados:", formData); 
  const result = await createUser(formData);
  if (result.error) {
    alert(result.message); // 👉 mostrará: "Username o Email ya están en uso"
  } else {
    alert("Usuario creado con éxito");
  }
};


  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4 text-center">Crear Usuario</h2>

      <div className="mb-3">
        <label className="block mb-1 font-medium">Usuario</label>
        <input
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-medium">Correo</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-medium">Rol</label>
        <select
          name="roleId"
          value={formData.roleId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value={1}>Admin</option>
          <option value={2}>Usuario</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-medium">Contraseña</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Creando..." : "Crear usuario"}
      </button>

      {message && (
        <p className={`mt-4 text-center ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
    </form>
  );
};


export default CreateUserForm;