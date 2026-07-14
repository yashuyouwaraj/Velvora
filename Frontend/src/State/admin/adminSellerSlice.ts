import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { Seller } from "../../types/SellerTypes";

export const fetchAdminSellers = createAsyncThunk<Seller[], { status?: string }>(
  "adminSellers/fetchAdminSellers",
  async ({ status }, { rejectWithValue }) => {
    try {
      const response = await api.get("/sellers", {
        params: status && status !== "ALL" ? { status } : {},
      });
      return response.data;
    } catch (error: any) {
      console.log("Fetch sellers error", error);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch sellers");
    }
  },
);

export const updateSellerAccountStatus = createAsyncThunk<
  Seller,
  { id: number; status: string }
>(
  "adminSellers/updateSellerAccountStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/api/seller/${id}/status/${status}`);
      return response.data;
    } catch (error: any) {
      console.log("Update seller status error", error);
      return rejectWithValue(error.response?.data?.message || "Failed to update seller status");
    }
  },
);

interface AdminSellerState {
  sellers: Seller[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminSellerState = {
  sellers: [],
  loading: false,
  error: null,
};

const adminSellerSlice = createSlice({
  name: "adminSellers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminSellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminSellers.fulfilled, (state, action) => {
        state.loading = false;
        state.sellers = action.payload;
      })
      .addCase(fetchAdminSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateSellerAccountStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSellerAccountStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.sellers = state.sellers.map((seller) =>
          seller.id === action.payload.id ? action.payload : seller,
        );
      })
      .addCase(updateSellerAccountStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default adminSellerSlice.reducer;
