import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import sellerSlice from "./seller/sellerSlice";
import sellerProductSlice from "./seller/sellerProductSlice";
import productSlice from "./customer/ProductSlice";
import authSlice from "./AuthSlice"

const rootReducer = combineReducers({
  seller: sellerSlice,
  sellerProduct: sellerProductSlice,
  product: productSlice,
  auth:authSlice
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
