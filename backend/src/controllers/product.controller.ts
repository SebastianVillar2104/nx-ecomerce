import { Request, Response, NextFunction } from "express";

import { getProducts } from "../services/product.service";

export const getProductsController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await getProducts();

    res.json(products);
  } catch (error) {
    next(error);
  }
};