import axios from "axios";

const URL_API = '/api/';


export const createUser = async (data: {
  userName: string;
  email: string;
  roleId: number;
  password: string;
}) => {
  try {
    const response = await axios.post("/api/register", data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      "No se logró crear el usuario";
    return { error: true, message };
  }
};



export const loginUser = async (data: {
  userName: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${URL_API}login`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error: any) {
    return {
      error: true,
      message: error.response?.data?.message || "No se logró iniciar sesión",
    };
  }
};
