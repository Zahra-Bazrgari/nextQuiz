export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export interface RootState {
  cart: CartState;
}
