import type { Product } from "../types/product";

const API_URL = import.meta.env.VITE_API_URL;

export const getProducts = async (
  token: string,
): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error?.message ?? "Failed to load products",
    );
  }

  return data;
};