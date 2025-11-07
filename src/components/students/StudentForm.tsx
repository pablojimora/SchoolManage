import React from "react";
import { Card, CardHeader, CardBody, Input, Button } from "@heroui/react";

interface StudentFormData {
    firstName: string;
    lastName: string;
    email: string;
}

interface StudentFormProps {
    formData: StudentFormData;
    errors: string[];
    isEditing: boolean;
    editingStudentName?: string;
    onSubmit: (e: React.FormEvent) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCancel?: () => void;
    isLoading?: boolean;
}

const StudentForm: React.FC<StudentFormProps> = ({
    formData,
    errors,
    isEditing,
    editingStudentName,
    onSubmit,
    onChange,
    onCancel,
    isLoading = false,
}) => {
    // Función para buscar errores específicos de cada campo
    const getFieldError = (fieldName: string): string | undefined => {
        return errors.find((err) => err.toLowerCase().includes(fieldName.toLowerCase()));
    };

    const firstNameError = getFieldError("first");
    const lastNameError = getFieldError("last");
    const emailError = getFieldError("email");

    return (
        <Card>
            <CardHeader>
                <h3 className="text-xl font-semibold">
                    {isEditing
                        ? `Edit Student: ${editingStudentName}`
                        : "Add New Student"}
                </h3>
            </CardHeader>
            <CardBody>
                <form onSubmit={onSubmit} noValidate>
                    <div className="space-y-4">
                        {/* First Name Input */}
                        <Input
                            type="text"
                            name="firstName"
                            label="First Name"
                            placeholder="Enter student's first name"
                            value={formData.firstName}
                            onChange={onChange}
                            isInvalid={!!firstNameError}
                            errorMessage={firstNameError || ""}
                            isDisabled={isLoading}
                            isRequired
                        />

                        {/* Last Name Input */}
                        <Input
                            type="text"
                            name="lastName"
                            label="Last Name"
                            placeholder="Enter student's last name"
                            value={formData.lastName}
                            onChange={onChange}
                            isInvalid={!!lastNameError}
                            errorMessage={lastNameError || ""}
                            isDisabled={isLoading}
                            isRequired
                        />

                        {/* Email Input */}
                        <Input
                            type="email"
                            name="email"
                            label="Email"
                            placeholder="Enter student's email"
                            value={formData.email}
                            onChange={onChange}
                            isInvalid={!!emailError}
                            errorMessage={emailError || ""}
                            isDisabled={isLoading}
                            isRequired
                        />

                        {/* Botones */}
                        <div className="flex gap-2">
                            <Button
                                className="flex-1"
                                type="submit"
                                variant="bordered"
                                color="primary"
                                isLoading={isLoading}
                                isDisabled={isLoading}
                            >
                                {isEditing ? "Update Student" : "Add Student"}
                            </Button>

                            {isEditing && onCancel && (
                                <Button
                                    className="flex-1"
                                    variant="bordered"
                                    color="default"
                                    onPress={onCancel}
                                    isDisabled={isLoading}
                                >
                                    Cancel
                                </Button>
                            )}
                        </div>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
};

export default StudentForm;