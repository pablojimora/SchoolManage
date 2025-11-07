"use client";

import { RiAdminFill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { FiPlus, FiLogOut } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserCardProps } from "@/interfaces/main";
import { getUsers } from "@/services/users";
import UserCard from "@/app/components/UserCard/UserCard";

const DashboardAdmin = () => {
  const [activeUsersManagement, setActiveUsersManagement] = useState(true);
  const [users, setUsers] = useState<UserCardProps[]>([]);
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();

  const onEdit = () => {
    console.log("Editando...");
  };

  const onDelete = () => {
    console.log("Borrando...");
  };

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedToken = localStorage.getItem("token");

    if (storedRole === "Admin" && storedToken) {
      setRole(storedRole);
      setToken(storedToken);
    } else {
      router.push("/pages/Login");
    }
  }, [router]);

  useEffect(() => {
    const loadUsers = async () => {
      if (!token) return;
      const users = await getUsers(token);
      if (users) {
        setUsers(users);
        console.log(users);
      }
    };

    loadUsers();
  }, [token]);

  const handleLogout = () => {
    localStorage.clear(); 
    router.push("/pages/Login"); 
  };

  return (
    <>
      <nav className="navbar flex items-center justify-between py-5 px-6 border-b-2">
        <div className="navbar__logo flex gap-4 items-center">
          <RiAdminFill size={22} />
          <span className="font-semibold">Admin Panel</span>
        </div>

        <div className="navbar__actions flex gap-7 items-center">
          <div className="navbar__actions--buttons flex gap-5">
            <button
              className={`${
                activeUsersManagement ? "bg-sky-500 text-white font-bold" : ""
              } p-2 rounded-[.3rem]`}
            >
              Manage Users
            </button>
            <button>Manage Students</button>
          </div>

          <div className="navbar__actions--info flex items-center gap-4">
            <div className="navbar__info--role flex items-center gap-2 pl-4 border-l-2">
              <FaRegUser />
              <span className="">{role}</span>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-[.3rem] hover:bg-gray-100 transition-colors"
              title="Logout"
            >
              <FiLogOut size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </nav>

      <div className="container w-[90%] max-w-[1200px] mx-auto my-19">
        <div className="container__content flex items-center justify-between">
          <div className="container__content--texts flex flex-col">
            <h3 className="content__texts--title text-[1.7rem] font-bold">
              {activeUsersManagement && "Manage Users"}
            </h3>
            <p className="content__texts--description">
              {activeUsersManagement && "View and manage all system users"}
            </p>
          </div>

          <button className="container__content--button flex items-center gap-3 bg-sky-500 text-white p-3 rounded-[.3rem] cursor-pointer">
            <FiPlus />
            {activeUsersManagement && <span>Add User</span>}
          </button>
        </div>

        <div className="container__cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mb-20">
          {users && users.length > 0 ? (
            users.map((user) => (
              <UserCard
                key={user.id}
                id={user.id}
                userName={user.userName}
                email={user.email}
                roleName={user.roleName}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          ) : (
            <span className="col-span-full text-center text-gray-500">
              No users found
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardAdmin;
