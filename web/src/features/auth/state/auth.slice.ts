import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// ---- Types ----
export type AuthStatus = "idle" | "loading" | "authenticated" | "error";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  status: AuthStatus;
}

// ---- Initial State ----
const initialState: AuthState = {
  user: null,
  status: "idle",
};

// ---- Slice ----
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.status = "authenticated";
    },

    setStatus: (state, action: PayloadAction<AuthStatus>) => {
      state.status = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.status = "idle";
    },
  },
});

// ---- Exports ----
export const { setUser, setStatus, logout } = authSlice.actions;
export default authSlice.reducer;
