import React from "react";
import { Card, CardHeader, CardBody } from "@heroui/react";
import { Student } from "@/services/studentService";
import StudentCard from "./StudentCard";

interface StudentListProps {
    students: Student[];
    onEdit: (student: Student) => void;
    onDelete: (id: number) => void;
    isLoading?: boolean;
}

const StudentList: React.FC<StudentListProps> = ({
    students,
    onEdit,
    onDelete,
    isLoading = false,
}) => {
    return (
        <Card>
            <CardHeader>
                <h3 className="text-xl font-semibold">Lista de Estudiantes</h3>
            </CardHeader>
            <CardBody>
                {isLoading ? (
                    <div className="flex justify-center items-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                ) : (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {Array.isArray(students) && students.map((student) => (
                            <StudentCard
                                key={student.id}
                                student={student}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))}
                        {(!Array.isArray(students) || students.length === 0) && (
                            <p className="text-gray-500 text-center py-4">
                                Estudiantes no encontrados. Agrega tu primer estudiante! 🎓
                            </p>
                        )}
                    </div>
                )}
            </CardBody>
        </Card>
    );
};

export default StudentList;