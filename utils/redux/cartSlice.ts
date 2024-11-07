import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, CartItem } from '../../types/types';
import { RootState } from './store';

interface CartState {
  quantity: number;
  items: CartItem[];
}

const initialState: CartState = {
  quantity: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        if (existingItem.quantity < existingItem.stock) {
          existingItem.quantity++;
          state.quantity++;
        }
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
        state.quantity++;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
        state.quantity--;
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        state.quantity -= item.quantity;
        state.items = state.items.filter((i) => i.id !== action.payload);
      }
    },
  },
});


export const selectTotalItems = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);


export const { addToCart, decreaseQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;