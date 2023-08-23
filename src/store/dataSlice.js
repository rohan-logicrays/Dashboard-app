// dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
const initialState = {
  chartData: [],
  status: "idle",
  error: null,
};

// Create the async thunk for API call
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  try {
    const response = await axios.get("http://localhost:3000/pie");
    return response.data;
  } catch (error) {
    throw Error("Failed to fetch data");
  }
});

export const postDataAsync = createAsyncThunk(
  "data/postData",
  async (dataToPost, { rejectWithValue }) => {
    try {
      // Replace 'yourApiEndpoint' with the actual API endpoint to post data.
      const response = await axios.post(
        "http://localhost:3000/pie",
        dataToPost
      );
      return response.data;
    } catch (error) {
      // If the request fails, return the error message as the payload.
      return rejectWithValue(error.response.data);
    }
  }
);

export const editDataAsync = createAsyncThunk(
  'data/editData',
  async ({ id, newData }, { rejectWithValue }) => {  
    try {
      const response = await axios.put(`http://localhost:3000/pie/${id}`, newData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteDataAsync = createAsyncThunk(
  "data/deleteData",
  async (id, { rejectWithValue }) => {
    
    try {
      await axios.delete(`http://localhost:3000/pie/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Create the data slice
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.chartData = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(postDataAsync.pending, (state) => {
        state.status = "loading"; 
        state.error = null;
      })
      .addCase(postDataAsync.fulfilled, (state, action) => {
        state.status = "succeeded"; 
        state.chartData.push(action.payload); 
        state.error = null;
      })
      .addCase(postDataAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(editDataAsync.fulfilled, (state, action) => {
        const updatedData = action.payload;
        state.chartData = state.chartData.map((item) => 
          item.id === updatedData.id ? updatedData : item
        );
        state.error = null;
      })
      .addCase(editDataAsync.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteDataAsync.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.chartData = state.chartData.filter( 
          (item) => item.id !== deletedId
        );
        state.error = null;
      })
      .addCase(deleteDataAsync.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
  
});

export default dataSlice.reducer;
