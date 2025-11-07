"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  type Student,
  type StudentPayload,
} from "@/services/studentService";
import { showSuccessToast, showErrorToast } from "@/utils/toast";
import DashboardHeader from "@/components/layout/DashboardHeader";
import StudentForm from "@/components/students/StudentForm";
import StudentList from "@/components/students/StudentList";

interface StudentFormData {
  firstName: string;
  lastName: string;
  email: string;
}

const DashboardUsers = () => {
  const router = useRouter();

  // Estado de sesión
  const [userSession, setUserSession] = useState<{
    username: string;
    name: string;
    role: string;
    isActive: boolean;
    loginTime: string;
  } | null>(null);

  // Estados de datos
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estados del formulario
  const [studentFormData, setStudentFormData] = useState<StudentFormData>({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [studentErrors, setStudentErrors] = useState<string[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // Verificar sesión al cargar el componente
  useEffect(() => {
    const session = localStorage.getItem("userSession");
    if (session) {
      setUserSession(JSON.parse(session));
      setLoading(false);
      loadStudents();
    } else {
      // router.push("/"); // Comentado temporalmente para testing
      setLoading(false);
      loadStudents(); // Cargar estudiantes igual para testing
    }
  }, [router]);

  // Cargar estudiantes desde la API
  const loadStudents = async () => {
    try {
      setLoading(true);
      const studentsData = await getStudents();
      setStudents(studentsData);
    } catch (error) {
      console.error("Error cargando estudiantes:", error);
      showErrorToast("Error cargando estudiantes");
    } finally {
      setLoading(false);
    }
  };

  // Manejar cambios en el formulario
  const handleStudentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudentFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar errores cuando el usuario empieza a escribir
    if (studentErrors.length > 0) {
      setStudentErrors([]);
    }
  };

  // Validar formulario de estudiante
  const validateStudentForm = (): string[] => {
    const errors: string[] = [];

    if (!studentFormData.firstName.trim()) {
      errors.push("Primer nombre es requerido");
    }

    if (!studentFormData.lastName.trim()) {
      errors.push("Apellido es requerido");
    }

    if (!studentFormData.email.trim()) {
      errors.push("Email es requerido");
    } else {
      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(studentFormData.email)) {
        errors.push("Formato de email inválido");
      }
    }

    return errors;
  };

  // Enviar formulario (crear o actualizar)
  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar formulario
    const validationErrors = validateStudentForm();
    if (validationErrors.length > 0) {
      setStudentErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      setStudentErrors([]);

      const payload: StudentPayload = {
        firstName: studentFormData.firstName.trim(),
        lastName: studentFormData.lastName.trim(),
        email: studentFormData.email.trim(),
      };

      if (editingStudent) {
        // Actualizar estudiante existente
        await updateStudent(editingStudent.id, payload);
        showSuccessToast("Estudiante actualizado correctamente!");
      } else {
        // Crear nuevo estudiante
        await createStudent(payload);
        showSuccessToast("Estudiante creado correctamente!");
      }

      // Limpiar formulario y recargar lista
      resetForm();
      loadStudents();
    } catch (error: any) {
      console.error("Error submitting student:", error);
      const errorMessage = error.message || "Error saving student";
      showErrorToast(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Preparar formulario para editar un estudiante
  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setStudentFormData({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
    });
    setStudentErrors([]);
    // Scroll al formulario (opcional pero mejora UX)
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Eliminar estudiante
  const handleDeleteStudent = async (id: number) => {
    // Confirmación antes de eliminar
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }

    try {
      await deleteStudent(id);
      showSuccessToast("Student deleted successfully!");
      loadStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
      showErrorToast("Error deleting student");
    }
  };

  // Cancelar edición y limpiar formulario
  const handleCancelEdit = () => {
    resetForm();
  };

  // Resetear formulario a estado inicial
  const resetForm = () => {
    setStudentFormData({
      firstName: "",
      lastName: "",
      email: "",
    });
    setEditingStudent(null);
    setStudentErrors([]);
  };

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("userSession");
    router.push("/");
  };

  // Mostrar loading mientras se verifica la sesión
  if (loading && !userSession) {
    return (
      <div className="dash-container">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dash-container">
      <div className="w-full max-w-7xl">
        {/* Header del Dashboard */}
        <DashboardHeader
          title="Students Management"
          userName={userSession?.name}
          userRole={userSession?.role}
          onLogout={handleLogout}
        />

        {/* Grid con formulario y lista */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario de Estudiantes */}
          <StudentForm
            formData={studentFormData}
            errors={studentErrors}
            isEditing={!!editingStudent}
            editingStudentName={
              editingStudent
                ? `${editingStudent.firstName} ${editingStudent.lastName}`
                : undefined
            }
            onSubmit={handleStudentSubmit}
            onChange={handleStudentChange}
            onCancel={handleCancelEdit}
            isLoading={isSubmitting}
          />

          {/* Lista de Estudiantes */}
          <StudentList
            students={students}
            onEdit={handleEditStudent}
            onDelete={handleDeleteStudent}
            isLoading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardUsers;