import { findAllProducts } from "../repositories/product.repository";
import { Product } from "../types/product";

export const getProducts = async (): Promise<Product[]> => {
  return findAllProducts();
};