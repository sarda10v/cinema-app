import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// !! AUTH
export const authSignUp = createAsyncThunk(
  "auth/signup",
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });
      const json = await res.json();
      if (json.error) {
        return thunkAPI.rejectWithValue(json.error);
      }
      return json;
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);

// !! LOGIN
export const authSignIn = createAsyncThunk(
  "auth/signin",
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });
      const json = await res.json();
      if (json.token.error) {
        return thunkAPI.rejectWithValue(json.token.error);
      }
      localStorage.setItem("token", json.token);
      localStorage.setItem("id", json.id);
      return json;
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);

export const applicationSlice = createSlice({
  name: "application",
  initialState: {
    error: null,
    signingUp: false,
    signingIn: false,
    token: localStorage.getItem("token"),
    id: localStorage.getItem("id"),
  },
  reducers: {},
  extraReducers: (builder) => {
    builder // !! AUTH
      .addCase(authSignUp.pending, (state, action) => {
        state.signingUp = true;
        state.error = null;
      })
      .addCase(authSignUp.rejected, (state, action) => {
        state.signingUp = false;
        state.error = action.payload;
      })
      .addCase(authSignUp.fulfilled, (state, action) => {
        state.signingUp = false;
        state.error = null;
      }) // !! LOGIN
      .addCase(authSignIn.pending, (state, action) => {
        state.signingIn = true;
        state.error = null;
      })
      .addCase(authSignIn.rejected, (state, action) => {
        state.signingIn = false;
        state.error = action.payload;
      })
      .addCase(authSignIn.fulfilled, (state, action) => {
        state.signingIn = false;
        state.error = null;
        state.token = action.payload.token;
        state.id = action.payload.id;
      });
  },
});
export default applicationSlice.reducer;
