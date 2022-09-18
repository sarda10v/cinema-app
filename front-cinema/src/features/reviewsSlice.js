import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// !! GET
export const fetchReviews = createAsyncThunk(
  "review/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/review", {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().application.token}`,
        },
      });
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

// !! POST
export const addNewReview = createAsyncThunk(
  "review/post",
  async ({ text, userId, id }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reviews: text, user: userId, cinema: id }),
      });

      const data = await res.json();

      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// !! DELETE
export const deleteReview = createAsyncThunk(
  "review/delete",
  async (id, thunkAPI) => {
    try {
      await fetch(`http://localhost:4000/review/${id}`, {
        method: "DELETE",
      });
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const addLikeInReview = createAsyncThunk(
  "add/like",
  async ({ i, userId }, thunkAPI) => {
    try {
      await fetch(`http://localhost:4000/review/${i}/user`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().application.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ like: userId }),
      });
      return { userId, i };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const removeLikeInReview = createAsyncThunk(
  "remove/like",
  async ({ i, userId }, thunkAPI) => {
    try {
      await fetch(`http://localhost:4000/review/${i}/user/remove`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().application.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ like: userId }),
      });
      return { userId, i };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const reviewSlice = createSlice({
  name: "review",
  initialState: {
    review: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.review = action.payload;
      })
      .addCase(addNewReview.fulfilled, (state, action) => {
        state.review.push(action.payload);
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.review = state.review.filter((item) => {
          return item._id !== action.payload;
        });
      })
      .addCase(addLikeInReview.fulfilled, (state, action) => {
        state.review = state.review.map((item) => {
          if (item._id === action.payload.i) {
            item.like.push(action.payload.userId);
            return item;
          }
          return item;
        });
      })
      .addCase(removeLikeInReview.fulfilled, (state, action) => {
        state.review = state.review.map((item) => {
          if (item._id === action.payload.i) {
            return {
              ...item,
              like: item.like.filter((el) => {
                return el._id !== action.payload.userId;
              }),
            };
          }
        });
      });
  },
});
export default reviewSlice.reducer;
