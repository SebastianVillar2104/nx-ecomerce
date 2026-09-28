import { useEffect, useState } from "react";

import { getProducts } from "../services/product.service";
import type { Product } from "../types/product";
import ProductCard from "./ProductCard";

interface ProductListProps {
  token: string;
}

const ProductList = ({ token }: ProductListProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const result = await getProducts(token);
        setProducts(result);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "No fue posible cargar los productos",
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [token]);

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <h2>Productos</h2>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductList;