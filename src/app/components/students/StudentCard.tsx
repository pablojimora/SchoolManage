import React from "react";
import { Button } from "@heroui/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Student } from "@/services/studentService";

interface StudentCardProps {
    student: Student;
    onEdit: (student: Student) => void;
    onDelete: (id: number) => void;
}

const StudentCard: React.FC<StudentCardProps> = ({
    student,
    onEdit,
    onDelete,
}) => {
    return (
        <div className="p-3 border rounded-lg hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h4 className="font-semibold text-lg">
                        {student.firstName} {student.lastName}
                    </h4>
                    <p className="text-sm text-gray-600">{student.email}</p>
                    <p className="text-sm text-gray-500">
                        Created: {new Date(student.created_at).toLocaleDateString()}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-400">ID: {student.id}</p>
                </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-2 mt-3">
                <Button
                    size="sm"
                    variant="flat"
                    color="primary"
                    startContent={<PencilIcon className="w-4 h-4" />}
                    onPress={() => onEdit(student)}
                >
                    Edit
                </Button>
                <Button
                    size="sm"
                    variant="flat"
                    color="danger"
                    startContent={<TrashIcon className="w-4 h-4" />}
                    onPress={() => onDelete(student.id)}
                >
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default StudentCard;