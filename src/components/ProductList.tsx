import { Product } from '@/types';

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return <div className="no-products">No products available</div>;
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image_url || '/placeholder-image.jpg'} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <div className="product-price">${product.price.toFixed(2)}</div>
          <button className="buy-btn">Buy Now</button>
        </div>
      ))}
    </div>
  );
}