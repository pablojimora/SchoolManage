import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUsers = async (token: string) => {
  try {
    console.log("Enviando token:", token);
    console.log("URL:", `${API_URL}/api/User`);
    const response = await axios.get(`${API_URL}/api/User`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })

    if (response.status !== 200) {
      throw new Error("Error al obtener los usuarios.")
    }

    return response.data;
  } catch(e) {
    console.error(e)
  }
}

export const updateUser = async (
  id: number,
  updatedUser: {
    userName: string;
    email: string;
    roleId: number;
    password?: string;
  },
  token: string
) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/User/${id}`,
      updatedUser,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error updating user:", error.response?.data || error.message);
    throw error;
  }
};



