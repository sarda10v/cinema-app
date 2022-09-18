import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCinema = createAsyncThunk(
  "cinema/fetch",
  async (page, thunkAPI) => {
    try {
      const res = await fetch(
        `http://localhost:4000/cinema?page=${page}&limit=12`
      );
      const data = await res.json();
      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      } else {
        return thunkAPI.fulfillWithValue(data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const cinemaSlice = createSlice({
  name: "cinema",
  initialState: {
    cinema: [],
    cinemaFilt: [],
    loader: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCinema.fulfilled, (state, action) => {
      state.cinema = action.payload;
    });
  },
});

export default cinemaSlice.reducer;
