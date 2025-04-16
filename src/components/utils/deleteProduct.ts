import axios from "axios";
import { ACCESS_TOKEN, API_KEY, BASE_URL } from "../api/api";

export async function deleteProduct(id: number) {
  try {
    const response = await axios.delete(`${BASE_URL}/api/records/my-products/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        api_key: API_KEY,
      },
    });

    console.log("Delete successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}
