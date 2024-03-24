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
      localStorage.setItem("login", json.login);

      return json;
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);
export const logout = createAsyncThunk("logout", (_, thunkAPI) => {
  localStorage.removeItem("token");
  localStorage.removeItem("login");
  localStorage.removeItem("id");
});

export const applicationSlice = createSlice({
  name: "application",
  initialState: {
    error: null,
    signingUp: false,
    signingIn: false,
    token: localStorage.getItem("token"),
    id: localStorage.getItem("id"),
    login: localStorage.getItem("login"),
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authSignUp.pending, (state) => {
        state.signingUp = true;
        state.error = null;
      })
      .addCase(authSignUp.rejected, (state, action) => {
        state.signingUp = false;
        state.error = action.payload;
      })
      .addCase(authSignUp.fulfilled, (state) => {
        state.signingUp = false;
        state.error = null;
      })
      .addCase(authSignIn.pending, (state) => {
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
        state.token = action.payload?.token;
        state.id = action.payload?.id;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
      });
  },
});
export default applicationSlice.reducer;
