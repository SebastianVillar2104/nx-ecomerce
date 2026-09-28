import {
  findAllProducts,
  Product,
} from "../repositories/product.repository";

export const getProducts = async (): Promise<Product[]> => {
  return findAllProducts();
};