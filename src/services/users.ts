import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUsers = async (token: {token: string}) => {
  try {
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

