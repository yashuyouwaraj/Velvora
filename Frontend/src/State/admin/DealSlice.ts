import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { Deal, DealsState } from "../../types/DealTypes";

const API_URL = "/admin/deals";

const getErrorMessage = (error: any, fallback: string): string =>
  error.response?.data?.message || error.response?.data || error.message || fallback;

export const fetchDeals = createAsyncThunk<Deal[], void, { rejectValue: string }>(
  "deal/fetchDeals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<Deal[]>(API_URL);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch deals"));
    }
  },
);

export const createDeal = createAsyncThunk("deal/createDeal", async (deal:any, { rejectWithValue }) => {
  try {
    const response = await api.post(API_URL, deal,{
      headers:{
        "Content-Type":"application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(getErrorMessage(error, "Failed to create deal"));
  }
});

export const updateDeal = createAsyncThunk<
  Deal,
  { id: number; deal: Deal },
  { rejectValue: string }
>("deal/updateDeal", async ({ id, deal }, { rejectWithValue }) => {
  try {
    const response = await api.patch<Deal>(`${API_URL}/${id}`, deal);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(getErrorMessage(error, "Failed to update deal"));
  }
});

export const deleteDeal = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("deal/deleteDeal", async (id, { rejectWithValue }) => {
  try {
    await api.delete(`${API_URL}/${id}`);
    return id;
  } catch (error: any) {
    return rejectWithValue(getErrorMessage(error, "Failed to delete deal"));
  }
});

const initialState: DealsState = {
  deals: [],
  loading: false,
  error: null,
  dealCreated: false,
  dealUpdated: false,
};

const dealSlice = createSlice({
  name: "deal",
  initialState,
  reducers: {
    resetDealStatus: (state) => {
      state.dealCreated = false;
      state.dealUpdated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.deals = action.payload;
      })
      .addCase(fetchDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch deals";
      })
      .addCase(createDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.dealCreated = false;
      })
      .addCase(createDeal.fulfilled, (state, action) => {
        state.loading = false;
        state.dealCreated = true;
        state.deals.push(action.payload);
      })
      .addCase(createDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string
      })
      .addCase(updateDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.dealUpdated = false;
      })
      .addCase(updateDeal.fulfilled, (state, action) => {
        state.loading = false;
        state.dealUpdated = true;
        const index = state.deals.findIndex((deal) => deal.id === action.payload.id);
        if (index >= 0) state.deals[index] = action.payload;
      })
      .addCase(updateDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update deal";
      })
      .addCase(deleteDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDeal.fulfilled, (state, action) => {
        state.loading = false;
        state.deals = state.deals.filter((deal) => deal.id !== action.payload);
      })
      .addCase(deleteDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete deal";
      });
  },
});

export const { resetDealStatus } = dealSlice.actions;

export default dealSlice.reducer;
