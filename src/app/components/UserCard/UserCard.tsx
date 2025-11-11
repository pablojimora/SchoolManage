import { UserCardProps } from "@/interfaces/main";
import { FaRegUser, FaEdit, FaRegTrashAlt } from "react-icons/fa";

const UserCard = ({ id, userName, email, roleName, onEdit, onDelete }: UserCardProps) => {
  
  return (
    <div
      id={String(id)}
      className="user__card bg-white shadow-md rounded-xl p-5 flex flex-col justify-between hover:shadow-lg transition-all duration-200"
    >
      <div className="user__card--header flex items-center gap-3 mb-4">
        <div className="p-3 bg-sky-100 text-sky-600 rounded-full">
          <FaRegUser size={22} />
        </div>

        <div className="user__card--header--info flex flex-col">
          <h3 className="font-semibold text-gray-800 text-lg">{userName}</h3>
          <span className="text-gray-500 text-sm">{email}</span>
        </div>
      </div>

      <div className="user__card--role mb-4">
        <span
          className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
            roleName === "Admin"
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-blue-600"
          }`}
        >
          {roleName}
        </span>
      </div>

      <div className="user__card--actions flex justify-end gap-3 mt-auto">
        <button
          onClick={() => onEdit({ id, userName, email, roleName, roleId: roleName === "Admin" ? 1 : 2, password: ""})}
          className="p-2 rounded-lg hover:bg-blue-100 text-blue-500 transition-colors"
          title="Edit User"
        >
          <FaEdit size={18} />
        </button>
        <button
          onClick={onDelete}
          className="p-2 rounded-lg hover:bg-red-100 text-red-500 transition-colors"
          title="Delete User"
        >
          <FaRegTrashAlt size={18} />
        </button>
      </div>
    </div>
  );
};

export default UserCard;
