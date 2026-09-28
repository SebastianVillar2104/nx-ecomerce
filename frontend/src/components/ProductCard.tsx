import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <article className="product-card">
      <div>
        <h2>{product.name}</h2>
        <p className="product-price">
          ${product.price}
        </p>
      </div>

      <p className="product-stock">
        Stock: {product.stock}
      </p>
    </article>
  );
};

export default ProductCard;