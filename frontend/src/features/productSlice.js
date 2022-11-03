import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const res = await axios.get('http://localhost:5000/products');
    return res.data;
  }
);
export const productSlice = createSlice({
  name: 'products',
  initialState: {
    item: [],
    error: null,
    isLoading: false,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.error = null;
      state.item = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.item = [];
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default productSlice.reducer;
