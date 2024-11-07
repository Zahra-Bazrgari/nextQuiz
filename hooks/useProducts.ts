import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../app/lib/axiosInstance'

export interface Product {
  id: number;
  title: string;
  description: string;
  brand: string;
  category: string;
  stock: number;
  rating: number;
}

const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await axiosInstance.get('/products');
  return data.products.map((product: any) => ({
    id: product.id,
    title: product.title,
    description: product.description,
    brand: product.brand,
    category: product.category,
    stock: product.stock,
    rating: product.rating,
  }));
};

export const useProducts = () => {
  return useQuery<Product[], Error>({queryKey:['products'], queryFn:fetchProducts});
};