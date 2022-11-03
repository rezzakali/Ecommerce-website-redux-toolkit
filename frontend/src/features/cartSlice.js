import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    totalQuantity: 0,
    totalAmount: 0,
    cart: localStorage.getItem('cartItem')
      ? JSON.parse(localStorage.getItem('cartItem'))
      : [],
  },
  reducers: {
    add: (state, action) => {
      const oldItemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (oldItemIndex >= 0) {
        state.cart[oldItemIndex].cartQuantity += 1;
        toast.info(`${state.cart[oldItemIndex].name} increased!`, {
          position: 'bottom-left',
          autoClose: 2000,
          pauseOnHover: true,
        });
      } else {
        const oldProduct = { ...action.payload, cartQuantity: 1 };
        state.cart.push(oldProduct);
        toast.success(`${action.payload.name} added your cart!`, {
          position: 'bottom-left',
          autoClose: 2000,
          pauseOnHover: true,
        });
      }
      localStorage.setItem('cartItem', JSON.stringify(state.cart));
    },
    removeCartItem: (state, action) => {
      const newItem = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      state.cart = newItem;
      localStorage.setItem('cartItem', JSON.stringify(state.cart));
      toast.error(`${action.payload.name} removed from your cart!`, {
        position: 'bottom-left',
        autoClose: 2000,
        pauseOnHover: true,
      });
    },
    decreaseCartItem: (state, action) => {
      const oldItemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cart[oldItemIndex].cartQuantity > 1) {
        state.cart[oldItemIndex].cartQuantity -= 1;
      } else if (state.cart[oldItemIndex].cartQuantity === 1) {
        const newItem = state.cart.filter(
          (item) => item.id !== action.payload.id
        );
        state.cart = newItem;
      }
      localStorage.setItem('cartItem', JSON.stringify(state.cart));
    },
    removeAllCartItem: (state) => {
      state.cart = [];
      localStorage.removeItem('cartItem', JSON.stringify(state.cart));
    },
    getTotalAmount: (state) => {
      let { total, quantity } = state.cart.reduce(
        (currentTotalAmount, currentCartItem) => {
          const { price, cartQuantity } = currentCartItem;
          const totalAmounts = price * cartQuantity;
          currentTotalAmount.total += totalAmounts;
          currentTotalAmount.quantity += cartQuantity;
          return currentTotalAmount;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.totalAmount = total;
      state.totalQuantity = quantity;
    },
  },
});

export const {
  add,
  removeCartItem,
  decreaseCartItem,
  removeAllCartItem,
  getTotalAmount,
} = cartSlice.actions;

export default cartSlice.reducer;
