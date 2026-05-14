import type { Product } from "../@types/product";

const BASE_URL = "https://fakestoreapi.com";

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
      throw new Error("Erro ao buscar produtos");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
