import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HomeCategory } from "../../types/HomeCategoryTypes";
import { api } from "../../config/Api";

const API_URL = "/admin";

export const updateHomeCategory = createAsyncThunk<
  HomeCategory,
  { id: number; data: HomeCategory }
>(
  "homeCategory/updateHomeCategory",

  async ({ id, data }, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await api.patch(`${API_URL}/home-category/${id}`, data, {
        headers: jwt ? { Authorization: `Bearer ${jwt}` } : undefined,
      });
      return response.data;
    } catch (error: any) {
      console.log("error", error);
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(
          "An error occurred while updating the category.",
        );
      }
    }
  },
);

export const createHomeCategory = createAsyncThunk<
  HomeCategory,
  HomeCategory,
  { rejectValue: string }
>(
  "homeCategory/createHomeCategory",
  async (data, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await api.post(`${API_URL}/home-category`, data, {
        headers: jwt ? { Authorization: `Bearer ${jwt}` } : undefined,
      });
      return response.data;
    } catch (error: any) {
      console.log("error", error);
      return rejectWithValue(
        error.response?.data?.message || "An error occurred while creating the category.",
      );
    }
  },
);

export const fetchHomeCategories = createAsyncThunk<HomeCategory[]>(
  "homeCategory/fetchHomeCategories",

  async (_, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await api.get(`${API_URL}/home-category`, {
        headers: jwt ? { Authorization: `Bearer ${jwt}` } : undefined,
      });
      return response.data;
    } catch (error: any) {
      console.log("error", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories",
      );
    }
  },
);

interface HomeCategoryState {
  categories: HomeCategory[];
  loading: boolean;
  error: string | null;
  categoryUpdated: boolean;
}

const initialState: HomeCategoryState = {
  categories: [],
  loading: false,
  error: null,
  categoryUpdated: false,
};

const homeCategorySlice = createSlice({
  name: "homeCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateHomeCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.categoryUpdated = false;
    });
    builder.addCase(updateHomeCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.categoryUpdated = true;
      const index = state.categories.findIndex(
        (category) => category.id === action.payload.id,
      );
      if (index !== -1) {
        state.categories[index] = action.payload;
      } else {
        state.categories.push(action.payload);
      }
    });
    builder.addCase(updateHomeCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(createHomeCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.categoryUpdated = false;
    });
    builder.addCase(createHomeCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.categories.push(action.payload);
      state.categoryUpdated = true;
    });
    builder.addCase(createHomeCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(fetchHomeCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.categoryUpdated = false;
    });
    builder.addCase(fetchHomeCategories.fulfilled, (state, action) => {
      state.loading = false
      state.categories = action.payload;
    });
    builder.addCase(fetchHomeCategories.rejected, (state,action) => {
      state.loading = false;
      state.error = action.payload as string ;
    });
  },
});

export default homeCategorySlice.reducer;