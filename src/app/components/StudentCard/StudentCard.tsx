import { StudentCardProps } from "@/interfaces/main";
import { FaUserGraduate, FaEdit, FaRegTrashAlt } from "react-icons/fa";

const StudentCard = ({ 
  id, 
  firstName, 
  lastName, 
  email, 
  created_at, 
  onEdit, 
  onDelete 
}: StudentCardProps) => {
  return (
    <div
      id={id.toString()}
      className="student__card bg-white shadow-md rounded-xl p-5 flex flex-col justify-between hover:shadow-lg transition-all duration-200"
    >
      <div className="student__card--header flex items-center gap-3 mb-4">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
          <FaUserGraduate size={22} />
        </div>

        <div className="student__card--header--info flex flex-col">
          <h3 className="font-semibold text-gray-800 text-lg">
            {firstName} {lastName}
          </h3>
          <span className="text-gray-500 text-sm">{email}</span>
        </div>
      </div>

      <div className="student__card--date mb-4">
        <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-600">
          Registered: {new Date(created_at).toLocaleDateString()}
        </span>
      </div>

      <div className="student__card--actions flex justify-end gap-3 mt-auto">
        <button
          onClick={onEdit}
          className="p-2 rounded-lg hover:bg-blue-100 text-blue-500 transition-colors"
          title="Edit Student"
        >
          <FaEdit size={18} />
        </button>
        <button
          onClick={onDelete}
          className="p-2 rounded-lg hover:bg-red-100 text-red-500 transition-colors"
          title="Delete Student"
        >
          <FaRegTrashAlt size={18} />
        </button>
      </div>
    </div>
  );
};

export default StudentCard;