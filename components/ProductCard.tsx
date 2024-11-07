import React from 'react';
import { Product } from '../hooks/useProducts';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="p-4 border rounded-md shadow-lg">
      <h2 className="text-xl font-bold">{product.title}</h2>
      <p>{product.description}</p>
      <p>Brand: {product.brand}</p>
      <p>Category: {product.category}</p>
      <p>Stock: {product.stock}</p>
      <p>Rating: {product.rating}</p>
    </div>
  );
};

export default ProductCard;