import React, { useEffect, useState } from 'react';
import { Product } from '../types/types';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/utils/redux/cartSlice';
import { RootState } from '@/utils/redux/store';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    setIsInCart(cartItems.some((item) => item.id === product.id));
  }, [cartItems, product.id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <div className="p-4 border rounded shadow-sm">
      <Link href={`/product/${product.id}`}>
        <img src={product.images[0]} alt={product.title} className="w-full h-48 object-cover" />
        <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
        <p className="text-gray-600">${product.price}</p>
      </Link>
      <button
        onClick={handleAddToCart}
        disabled={isInCart}
        className={`mt-2 w-full ${isInCart ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'} py-1 px-2 rounded`}
      >
        {isInCart ? 'In Cart' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductCard;
