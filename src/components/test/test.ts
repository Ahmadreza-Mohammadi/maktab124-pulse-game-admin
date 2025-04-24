import axios from "axios";
import { products } from "../../database/products";
import { API_KEY, BASE_URL } from "../api/api";

export async function addToApi() {
  for (const product of products) {
    const response = await axios.post(
      `${BASE_URL}/api/records/products`,
      JSON.stringify(product),
      {
        headers: {
          api_key: API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(`Product added: ${response.data}`);
  }
}

