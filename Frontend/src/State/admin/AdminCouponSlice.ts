import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coupon } from "../../types/couponTypes";
import { api } from "../../config/Api";

const API_URL = "/api/coupons";

export const fetchCoupons = createAsyncThunk<Coupon[], void, { rejectValue: string }>(
  "adminCoupons/fetchCoupons",
  async (_, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await api.get(`${API_URL}/admin/all`, {
        headers: jwt ? { Authorization: `Bearer ${jwt}` } : undefined,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch coupons");
    }
  },
);

export const createCoupon = createAsyncThunk<
  Coupon,
  { coupon: any; jwt: string },
  { rejectValue: string }
>("adminCoupons/createCoupon", async ({ coupon, jwt }, { rejectWithValue }) => {
  try {
    const response = await api.post(`${API_URL}/admin/create`, coupon, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Failed to create coupon");
  }
});

export const updateCoupon = createAsyncThunk<
  Coupon,
  { id: number; coupon: any; jwt: string },
  { rejectValue: string }
>("adminCoupons/updateCoupon", async ({ id, coupon, jwt }, { rejectWithValue }) => {
  try {
    const response = await api.patch(`${API_URL}/admin/${id}`, coupon, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to update coupon");
  }
});

export const deleteCoupon = createAsyncThunk<
  number,
  { id: number; jwt: string },
  { rejectValue: string }
>("adminCoupons/deleteCoupon", async ({ id, jwt }, { rejectWithValue }) => {
  try {
    await api.delete(`${API_URL}/admin/delete/${id}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return id;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to delete coupon");
  }
});

interface AdminCouponState {
  coupons: Coupon[];
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: AdminCouponState = {
  coupons: [],
  loading: false,
  error: null,
  successMessage: null,
};

const adminCouponSlice = createSlice({
  name: "adminCoupons",
  initialState,
  reducers: {
    clearCouponMessage(state) {
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(fetchCoupons.fulfilled, (state, action: PayloadAction<Coupon[]>) => {
        state.loading = false;
        state.coupons = action.payload;
      })
      .addCase(fetchCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch coupons";
      })
      .addCase(createCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createCoupon.fulfilled, (state, action: PayloadAction<Coupon>) => {
        state.loading = false;
        state.coupons.push(action.payload);
        state.successMessage = "Coupon created successfully";
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create coupon";
      })
      .addCase(updateCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateCoupon.fulfilled, (state, action: PayloadAction<Coupon>) => {
        state.loading = false;
        state.coupons = state.coupons.map((coupon) =>
          coupon.id === action.payload.id ? action.payload : coupon,
        );
        state.successMessage = "Coupon updated successfully";
      })
      .addCase(updateCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update coupon";
      })
      .addCase(deleteCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(deleteCoupon.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.coupons = state.coupons.filter((coupon) => coupon.id !== action.payload);
        state.successMessage = "Coupon deleted successfully";
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete coupon";
      });
  },
});

export const { clearCouponMessage } = adminCouponSlice.actions;
export default adminCouponSlice.reducer;
