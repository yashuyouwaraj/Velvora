import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { SellerReport } from "../../types/SellerTypes";

export const fetchSellerProfile = createAsyncThunk<any, any>(
  "/sellers/fetchSellerProfile",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await api.get("/sellers/profile", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log("error --- ", error);
      return rejectWithValue("Failed to fetch seller profile");
    }
  },
);

export const fetchSellerReport = createAsyncThunk<SellerReport, string>(
  "/sellers/fetchSellerReport",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await api.get("/sellers/report", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log("error --- ", error);
      return rejectWithValue("Failed to fetch seller report");
    }
  },
);

export const updateSellerProfile = createAsyncThunk<any, { jwt: string; request: any }>(
  "/sellers/updateSellerProfile",
  async ({ jwt, request }, { rejectWithValue }) => {
    try {
      const response = await api.patch("/sellers", request, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log("error --- ", error);
      return rejectWithValue("Failed to update seller profile");
    }
  },
);

interface SellerState {
  sellers: any[];
  selectedSeller: any;
  profile: any;
  report: SellerReport | null;
  loading: boolean;
  error: any;
}

const initialState: SellerState = {
  sellers: [],
  selectedSeller: null,
  profile: null,
  report: null,
  loading: false,
  error: null,
};

const sellerSlice = createSlice({
  name: "sellers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSellerProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSellerProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    });
    builder.addCase(fetchSellerProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchSellerReport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSellerReport.fulfilled, (state, action) => {
      state.loading = false;
      state.report = action.payload;
    });
    builder.addCase(fetchSellerReport.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateSellerProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateSellerProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    });
    builder.addCase(updateSellerProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default sellerSlice.reducer;
