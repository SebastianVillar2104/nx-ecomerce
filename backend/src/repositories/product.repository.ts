import { postgresPool } from "../database/postgres";

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export const findAllProducts = async (): Promise<Product[]> => {
  const result = await postgresPool.query<Product>(`
    SELECT
      id,
      name,
      price,
      stock
    FROM product
    ORDER BY name;
  `);

  return result.rows;
};