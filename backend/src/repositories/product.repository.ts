import { postgresPool } from "../database/postgres";
import { Product } from "../types/product";

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