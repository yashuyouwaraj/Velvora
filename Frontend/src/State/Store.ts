import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import sellerSlice from "./seller/sellerSlice";
import sellerProductSlice from "./seller/sellerProductSlice";
import productSlice from "./customer/ProductSlice";
import authSlice from "./AuthSlice";
import cartSlice from "./customer/CartSlice";
import orderSlice from "./customer/orderSlice";
import wishlistSlice from "./customer/wishlistSlice";
import sellerOrderSlice from "./seller/sellerOrderSlice";
import transactionSlice from "./seller/transactionSlice";
import adminSlice from "./admin/AdminSlice";
import adminCouponSlice from "./admin/AdminCouponSlice";
import adminSellerSlice from "./admin/adminSellerSlice";
import customerSlice from "./customer/CustomerSlice";
import dealSlice from "./admin/DealSlice";

const rootReducer = combineReducers({
  seller: sellerSlice,
  sellerProduct: sellerProductSlice,
  product: productSlice,
  auth: authSlice,
  cart: cartSlice,
  order: orderSlice,
  wishlist: wishlistSlice,
  sellerOrder: sellerOrderSlice,
  transactions: transactionSlice,
  admin: adminSlice,
  adminCoupons: adminCouponSlice,
  adminSellers: adminSellerSlice,
  customer: customerSlice,
  deal: dealSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
