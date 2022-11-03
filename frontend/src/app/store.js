import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cartSlice';
import productReducer from '../features/productSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
});

export default store;
