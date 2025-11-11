"use client";

import { RiAdminFill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { FiPlus, FiLogOut } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserCardProps } from "@/interfaces/main";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "@/services/users";
import UserCard from "@/app/components/UserCard/UserCard";
import EditUserModal from "@/app/components/EditUserModal/EditUserModal";
import {
  createStudent,
  deleteStudent,
  getStudents,
  updateStudent,
  type Student,
} from "@/services/studentService";
import StudentCard from "@/app/components/StudentCard/StudentCard";
import { showErrorToast, showInfoToast, showSuccessToast, showWarningToast } from "@/utils/toast";
import AddUserModal from "@/app/components/AddUserModal/AddUserModal";



const DashboardAdmin = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeUsersManagement, setActiveUsersManagement] = useState(true);
  const [activeStudentsManagement, setActiveStudentsManagement] =
    useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState<UserCardProps[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();

 


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onEditUser = (user: any) => {
    setSelectedUser({ ...user, token });
    setIsEditModalOpen(true);
    console.log("Usuario seleccionado", user);
  };

  const onEditStudent = async (id: number) => {
    console.log("Editando estudiante:", id);
    const firstName = prompt("Nuevo nombre:");
    const lastName = prompt("Nuevo apellido:");
    const email = prompt("Nuevo email:");

    if (firstName && lastName && email) {
      try {
        await updateStudent(id, { firstName, lastName, email });
        alert("Estudiante actualizado correctamente");
        const studentsData = await getStudents();
        setStudents(studentsData);
      } catch (error) {
        console.error("Error al actualizar:", error);
        alert("Error al actualizar el estudiante");
      }
    }
  };


  ///-------------------

  const onDeleteUser = async (id: number) => {
    const confirmDelete = confirm("¿Estás seguro de eliminar este usuario?");
    if (!confirmDelete) return;

    try {
      await deleteUser(id, token);
      showSuccessToast("Usuario eliminado correctamente ");
      const updatedUsers = await getUsers(token);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      showErrorToast("Error al eliminar el usuario ");
    }
  };


  ///-----------------------------


  const onDelete = () => {
    console.log("Borrando...");
  };

  const onDeleteStudent = async (id: number) => {
    const confirmDelete = confirm("¿Estás seguro de eliminar este estudiante?");

    if (confirmDelete) {
      try {
        await deleteStudent(id);
        alert("Estudiante eliminado correctamente");
        const studentsData = await getStudents();
        setStudents(studentsData);
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Error al eliminar el estudiante");
      }
    }
  };



const [isAddModalOpen, setIsAddModalOpen] = useState(false);

const handleAddUser = () => {
  setIsAddModalOpen(true);
};

  //-----------------------

  const handleAddStudent = async () => {
    const firstName = prompt("Nombre del estudiante:");
    const lastName = prompt("Apellido del estudiante:");
    const email = prompt("Email del estudiante:");

    if (firstName && lastName && email) {
      try {
        await createStudent({ firstName, lastName, email });
        alert("Estudiante creado correctamente");
        const studentsData = await getStudents();
        setStudents(studentsData);
      } catch (error) {
        console.error("Error al crear:", error);
        alert("Error al crear el estudiante");
      }
    }
  };

  useEffect(() => {
    const checkAuth = () => {
      const storedRole = localStorage.getItem("role");
      const storedToken = localStorage.getItem("token");

      if (storedRole === "Admin" && storedToken) {
        setRole(storedRole);
        setToken(storedToken);
      } else {
        router.push("/pages/Login");
      }
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    const loadUsers = async () => {
      if (!token) return;
      const users = await getUsers(token);
      if (users) {
        setUsers(users);
      }
    };

    loadUsers();
  }, [token]);

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

  const handleUsers = () => {
    if (activeUsersManagement) return;
    setActiveUsersManagement(true);
    setActiveStudentsManagement(false);
  };

  const handleStudents = () => {
    if (activeStudentsManagement) return;
    setActiveStudentsManagement(true);
    setActiveUsersManagement(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/pages/Login");
  };

  return (
    <>
      <nav className="flex items-center justify-between py-4 px-8 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200">
        <div className="flex items-center gap-3">
          <RiAdminFill size={26} className="text-indigo-600" />
          <span className="text-lg font-semibold text-gray-800 tracking-wide">
            Admin Panel
          </span>
          
        </div>

        <div className="flex items-center gap-8">
          <div className="flex gap-3">
            <button
              onClick={handleUsers}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeUsersManagement
                  ? "bg-linear-to-r from-sky-600 to-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              Manage Users
            </button>
            <button
              onClick={handleStudents}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeStudentsManagement
                  ? "bg-linear-to-r from-sky-600 to-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              Manage Students
            </button>
          </div>

          <div className="flex items-center gap-5 pl-6 border-l border-gray-300">
            <div className="flex items-center gap-2 text-gray-700">
              <FaRegUser className="text-gray-500" />
              <span className="text-sm font-medium">{role}</span>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-full hover:bg-red-50 transition-all duration-200"
              title="Logout"
            >
              <FiLogOut size={20} className="text-red-500 hover:text-red-600" />
            </button>
          </div>
        </div>
      </nav>

      <div className="container w-[90%] max-w-[1200px] mx-auto my-19">
        <div className="container__content flex items-center justify-between">
          <div className="container__content--texts flex flex-col">
            <h3 className="content__texts--title text-[1.7rem] font-bold">
              {activeUsersManagement && "Manage Users"}
              {activeStudentsManagement && "Manage Students"}
            </h3>
            <p className="content__texts--description text-gray-700">
              {activeUsersManagement && "View and manage all system users"}
              {activeStudentsManagement &&
                "View and manage all system students"}
            </p>
          </div>

          <button
            onClick={
              activeStudentsManagement
                ? handleAddStudent
                : activeUsersManagement
                ? handleAddUser
                : undefined
            }
            className="container__content--button flex items-center gap-3 bg-linear-to-r from-sky-600 to-blue-600 text-white p-3 rounded-[.3rem] cursor-pointer"
          >
            <FiPlus />
            {activeUsersManagement && <span>Add User</span>}
            {activeStudentsManagement && <span>Add Student</span>}
          </button>
        </div>

        <div className="container__cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mb-20">
          {activeUsersManagement && users && users.length > 0
            ? users.map((user) => (
                <UserCard
                  key={user.id}
                  id={user.id}
                  userName={user.userName}
                  email={user.email}
                  roleName={user.roleName}
                  onEdit={onEditUser}
                   onDelete={() => onDeleteUser(user.id)}//------//
                />
              ))
            : activeUsersManagement && (
                <span className="col-span-full text-center text-gray-500">
                  No users found
                </span>
              )}

          {activeStudentsManagement && students && students.length > 0
            ? students.map((student) => (
                <StudentCard
                  key={student.id}
                  id={student.id}
                  firstName={student.firstName}
                  lastName={student.lastName}
                  email={student.email}
                  created_at={student.created_at}
                  onEdit={() => onEditStudent(student.id)}
                  onDelete={() => onDeleteStudent(student.id)}
                />
              ))
            : activeStudentsManagement && (
                <span className="col-span-full text-center text-gray-500">
                  No students found
                </span>
              )}
        </div>

        {isEditModalOpen && (
          <EditUserModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            user={selectedUser}
            onSave={async (updatedUser) => {
              const token = localStorage.getItem("token");
              if (!token) return;

              try {
                const response = await updateUser(
                  updatedUser.id,
                  updatedUser,
                  token
                );

                const updatedWithRoleName = {
                  ...response,
                  roleName:
                    response.roleName ||
                    (response.roleId === 1 ? "Admin" : "User"),
                };

                console.log(
                  "Usuario actualizado correctamente:",
                  updatedWithRoleName
                );

                setUsers((prev) =>
                  prev.map((u) =>
                    u.id === updatedWithRoleName.id ? updatedWithRoleName : u
                  )
                );
              } catch (err) {
                console.error(err);
              }
              setIsEditModalOpen(false);
            }}
          />
        )}


        {isAddModalOpen && (
        <AddUserModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={async (newUser) => {
            const token = localStorage.getItem("token");
            if (!token) {
              showErrorToast("Token no encontrado ❌");
              return;
            }

            try {
              await createUser(newUser, token);
              showSuccessToast("Usuario creado correctamente ✅");

              const updatedUsers = await getUsers(token);
              setUsers(updatedUsers);
            } catch (error) {
              console.error("Error al crear usuario:", error);
              showErrorToast("Error al crear el usuario ❌");
            }

            setIsAddModalOpen(false);
          }}
        />
      )}



      </div>
    </>
  );
};

export default DashboardAdmin;
