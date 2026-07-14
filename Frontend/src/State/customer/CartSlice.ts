import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, CartItem } from "../../types/CartTypes";
import { api } from "../../config/Api";
import { sumCartItemMrpPrice } from "../../util/sumCartItemMrpPrice";
import { sumCartItemSellingPrice } from "../../util/sumCartItemSellingPrice";
import { applyCoupon } from "./CouponSlice";

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

const API_URL = "/api/cart";

export const fetchUserCart = createAsyncThunk<Cart, string>(
  "cart/fetchUserCart",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await api.get(API_URL, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return response.data;
    } catch (error: any) {
      console.log("error ", error.response);
      return rejectWithValue("Failed to fetch user Cart");
    }
  },
);

interface AddItemRequest {
  productId: number | undefined;
  size: string;
  quantity: number;
}

export const addItemToCart = createAsyncThunk<
  CartItem,
  { jwt: string | null; request: AddItemRequest }
>("cart/addItemToCart", async ({ jwt, request }, { rejectWithValue }) => {
  try {
    const response = await api.put(`${API_URL}/add`, request, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.log("error ", error.response);
    return rejectWithValue("Failed to add item to cart");
  }
});

export const deleteCartItem = createAsyncThunk<
  any,
  { jwt: string; cartItemId: number }
>("cart/deleteCartItem", async ({ jwt, cartItemId }, { rejectWithValue }) => {
  try {
    const response = await api.delete(`${API_URL}/item/${cartItemId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.log("error ", error.response);
    return rejectWithValue("Failed to delete item from cart");
  }
});

export const updateCartItem = createAsyncThunk<
  CartItem,
  { jwt: string | null; cartItemId: number; cartItem: any }
>(
  "cart/updateCartItem",
  async ({ jwt, cartItemId, cartItem }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `${API_URL}/item/${cartItemId}`,
        cartItem,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );

      return response.data;
    } catch (error: any) {
      console.log("error ", error.response);
      return rejectWithValue("Failed to update item to cart");
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCartState: (state) => {
      state.cart = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserCart.fulfilled,
        (state, action: PayloadAction<Cart>) => {
          state.cart = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addItemToCart.pending,(state)=>{
        state.loading=true
        state.error=null
      })
      .addCase(addItemToCart.fulfilled,(state,action:PayloadAction<CartItem>)=>{
        if(state.cart){
            state.cart.cartItems.push(action.payload)
        }
        state.loading=false
      })
      .addCase(addItemToCart.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload as string
      })
      .addCase(deleteCartItem.pending,(state)=>{
        state.loading=true
        state.error=null
      })
      .addCase(deleteCartItem.fulfilled,(state,action)=>{
        if(state.cart){
            state.cart.cartItems=state.cart.cartItems.filter((item:CartItem)=>item.id !== action.meta.arg.cartItemId)
            const mrpPrice=sumCartItemMrpPrice(state.cart?.cartItems || [])
            const sellingPrice=sumCartItemSellingPrice(state.cart?.cartItems || [])
            state.cart.totalMrpPrice=mrpPrice
            state.cart.totalSellingPrice=sellingPrice

            state.loading=false
        }
      })
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action: PayloadAction<CartItem>) => {
        if (state.cart) {
          const itemIndex = state.cart.cartItems.findIndex(
            (item) => item.id === action.payload.id,
          );

          if (itemIndex !== -1) {
            state.cart.cartItems[itemIndex] = action.payload;
            const items = state.cart.cartItems;
            state.cart.totalMrpPrice = sumCartItemMrpPrice(items);
            state.cart.totalSellingPrice = sumCartItemSellingPrice(items);
            state.cart.totalItem = items.reduce(
              (total, item) => total + item.quantity,
              0,
            );
          }
        }
        state.loading = false;
      })
      .addCase(updateCartItem.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload as string
      })
      .addCase(applyCoupon.fulfilled,(state,action)=>{
        state.loading=false
        state.cart=action.payload
      })
  },
});

export default cartSlice.reducer
export const { resetCartState } = cartSlice.actions;
