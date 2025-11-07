import axios from "axios";

const API = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/Student`,
    headers: {
        "Content-Type": "application/json",
    },
});

// interface base
export interface Student {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    created_at: string;
}

//interface POST/PUT
export interface StudentPayload {
    firstName: string;
    lastName: string;
    email: string;
}


// GET
export const getStudents = async (): Promise<Student[]> => {
    try {
        // Obtener token del localStorage si existe
        const token = localStorage.getItem("token");
        
        const config = token ? {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        } : {};
        
        const { data } = await API.get("/", config);

        // Asegurarse de que siempre devolvemos un array
        return Array.isArray(data) ? data : [];
    } catch (error: any) {
        console.error("Error al obtener estudiantes:", error.response?.data || error.message);
        console.error("Status code:", error.response?.status);
        throw new Error("No se pudieron obtener los estudiantes");
    }
};


export const getStudentById = async (id: number): Promise<Student> => {
    try {
        const token = localStorage.getItem("token");
        const config = token ? {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        } : {};
        
        const { data } = await API.get(`/${id}`, config);
        return data;
    } catch (error: any) {
        console.error(`Error al obtener estudiante con ID ${id}:`, error.response?.data || error.message);
        throw new Error("No se pudo obtener el estudiante");
    }
};


// POST
export const createStudent = async (student: StudentPayload) => {
    try {
        const token = localStorage.getItem("token");
        const config = token ? {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        } : {};
        
        const { data } = await API.post("/", student, config);
        return data;
    } catch (error: any) {
        console.error("Error al crear estudiante:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "No se pudo crear el estudiante");
    }
};


// PUT
export const updateStudent = async (id: number, student: StudentPayload) => {
    try {
        const token = localStorage.getItem("token");
        const config = token ? {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        } : {};
        
        const { data } = await API.put(`/${id}`, student, config);
        return data;
    } catch (error: any) {
        console.error(`Error al actualizar estudiante ${id}:`, error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "No se pudo actualizar el estudiante");
    }
};


// DELETE
export const deleteStudent = async (id: number) => {
    try {
        const token = localStorage.getItem("token");
        const config = token ? {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        } : {};
        
        const { data } = await API.delete(`/${id}`, config);
        return data;
    } catch (error: any) {
        console.error(`Error al eliminar estudiante ${id}:`, error.response?.data || error.message);
        throw new Error("No se pudo eliminar el estudiante");
    }
};

export default {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
};