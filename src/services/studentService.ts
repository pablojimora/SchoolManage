import axios from "axios";

const API = axios.create({
  baseURL: "https://webescuela-production.up.railway.app/api/student",
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
    const { data } = await API.get("/");
    return data;
  } catch (error: any) {
    console.error("Error al obtener estudiantes:", error.response?.data || error.message);
    throw new Error("No se pudieron obtener los estudiantes");
  }
};

// GET BY ID
export const getStudentById = async (id: number): Promise<Student> => {
  try {
    const { data } = await API.get(`/${id}`);
    return data;
  } catch (error: any) {
    console.error(`Error al obtener estudiante con ID ${id}:`, error.response?.data || error.message);
    throw new Error("No se pudo obtener el estudiante");
  }
};

// POST
export const createStudent = async (student: StudentPayload) => {
  try {
    const { data } = await API.post("/", student);
    return data;
  } catch (error: any) {
    console.error("Error al crear estudiante:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "No se pudo crear el estudiante");
  }
};

// PUT
export const updateStudent = async (id: number, student: StudentPayload) => {
  try {
    const { data } = await API.put(`/${id}`, student);
    return data;
  } catch (error: any) {
    console.error(`Error al actualizar estudiante ${id}:`, error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "No se pudo actualizar el estudiante");
  }
};

// DELETE
export const deleteStudent = async (id: number) => {
  try {
    const { data } = await API.delete(`/${id}`);
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
  
