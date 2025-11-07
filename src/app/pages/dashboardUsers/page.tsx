"use client";

// 1. IMPORTS
import { FaRegUser } from "react-icons/fa";
import { FiPlus, FiLogOut } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStudents, deleteStudent, updateStudent, createStudent, Student } from "@/services/studentService";
import StudentCard from "@/app/components/StudentCard/StudentCard";

// 2. COMPONENTE PRINCIPAL
const DashboardUsers = () => {
  // 3. ESTADOS
  const [students, setStudents] = useState<Student[]>([]);
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();

  // 4. FUNCIONES DE CRUD
  const onEdit = async (id: number) => {
    console.log("Editando estudiante:", id);
    // TODO: Aquí puedes abrir un modal o formulario para editar
    // Por ahora, vamos a hacer un ejemplo simple con prompt
    const firstName = prompt("Nuevo nombre:");
    const lastName = prompt("Nuevo apellido:");
    const email = prompt("Nuevo email:");
    
    if (firstName && lastName && email) {
      try {
        await updateStudent(id, { firstName, lastName, email });
        alert("Estudiante actualizado correctamente");
        // Recargar la lista
        const studentsData = await getStudents();
        setStudents(studentsData);
      } catch (error) {
        console.error("Error al actualizar:", error);
        alert("Error al actualizar el estudiante");
      }
    }
  };

  const onDelete = async (id: number) => {
    const confirmDelete = confirm("¿Estás seguro de eliminar este estudiante?");
    
    if (confirmDelete) {
      try {
        await deleteStudent(id);
        alert("Estudiante eliminado correctamente");
        // Recargar la lista
        const studentsData = await getStudents();
        setStudents(studentsData);
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Error al eliminar el estudiante");
      }
    }
  };

  const handleAddStudent = async () => {
    const firstName = prompt("Nombre del estudiante:");
    const lastName = prompt("Apellido del estudiante:");
    const email = prompt("Email del estudiante:");
    
    if (firstName && lastName && email) {
      try {
        await createStudent({ firstName, lastName, email });
        alert("Estudiante creado correctamente");
        // Recargar la lista
        const studentsData = await getStudents();
        setStudents(studentsData);
      } catch (error) {
        console.error("Error al crear:", error);
        alert("Error al crear el estudiante");
      }
    }
  };

  // 5. VERIFICAR AUTENTICACIÓN (useEffect #1)
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedToken = localStorage.getItem("token");

    // Permitir acceso solo a usuarios normales (no admin)
    if (storedToken && storedRole) {
      setRole(storedRole);
      setToken(storedToken);
    } else {
      router.push("/pages/Login");
    }
  }, [router]);

  // 6. CARGAR ESTUDIANTES (useEffect #2)
  useEffect(() => {
    const loadStudents = async () => {
      if (!token) return;
      try {
        const studentsData = await getStudents();
        if (studentsData) {
          setStudents(studentsData);
          console.log("Estudiantes cargados:", studentsData);
        }
      } catch (error) {
        console.error("Error al cargar estudiantes:", error);
      }
    };

    loadStudents();
  }, [token]);

  // 7. FUNCIÓN DE LOGOUT
  const handleLogout = () => {
    localStorage.clear();
    router.push("/pages/Login");
  };

  // 8. RENDER (JSX)
  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar flex items-center justify-between py-5 px-6 border-b-2">
        <div className="navbar__logo flex gap-4 items-center">
          <FaRegUser size={22} />
          <span className="font-semibold">User Panel</span>
        </div>

        <div className="navbar__actions flex gap-7 items-center">
          <div className="navbar__info--role flex items-center gap-2 pl-4 border-l-2">
            <FaRegUser />
            <span>{role}</span>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 rounded-[.3rem] hover:bg-gray-100 transition-colors"
            title="Logout"
          >
            <FiLogOut size={20} className="text-gray-600" />
          </button>
        </div>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <div className="container w-[90%] max-w-[1200px] mx-auto my-19">
        {/* HEADER CON TÍTULO Y BOTÓN */}
        <div className="container__content flex items-center justify-between">
          <div className="container__content--texts flex flex-col">
            <h3 className="content__texts--title text-[1.7rem] font-bold">
              Manage Students
            </h3>
            <p className="content__texts--description">
              View and manage all students
            </p>
          </div>

          <button 
            onClick={handleAddStudent}
            className="container__content--button flex items-center gap-3 bg-blue-500 text-white p-3 rounded-[.3rem] cursor-pointer hover:bg-blue-600 transition-colors"
          >
            <FiPlus />
            <span>Add Student</span>
          </button>
        </div>

        {/* GRID DE TARJETAS */}
        <div className="container__cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mb-20">
          {students && students.length > 0 ? (
            students.map((student) => (
              <StudentCard
                key={student.id}
                id={student.id}
                firstName={student.firstName}
                lastName={student.lastName}
                email={student.email}
                created_at={student.created_at}
                onEdit={() => onEdit(student.id)}
                onDelete={() => onDelete(student.id)}
              />
            ))
          ) : (
            <span className="col-span-full text-center text-gray-500">
              No students found
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardUsers;