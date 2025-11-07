import React from "react";
import { Button } from "@heroui/react";

interface DashboardHeaderProps {
    title: string;
    userName?: string;
    userRole?: string;
    onLogout: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
    title,
    userName,
    userRole,
    onLogout,
}) => {
    return (
        <div className="flex justify-between items-center mb-6 w-full">
            <h1 className="text-3xl font-bold">{title}</h1>
            <div className="text-right">
                {userName && (
                    <p className="text-sm text-gray-600">Welcome, {userName}</p>
                )}
                {userRole && <p className="text-xs text-gray-500">Role: {userRole}</p>}
                <Button
                    onPress={onLogout}
                    className="mt-2 bg-linear-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                >
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default DashboardHeader;