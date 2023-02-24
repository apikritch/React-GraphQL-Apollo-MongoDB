import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const initialAuthState = {
  user: null,
};

if (localStorage.getItem("token")) {
  const decodedToken = jwtDecode(localStorage.getItem("token"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
  } else {
    initialAuthState.user = decodedToken;
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      localStorage.setItem("token", action.payload.token);
      state.user = jwtDecode(action.payload.token);
    },
    logout(state) {
      localStorage.removeItem("token");
      state.user = null;
    },
  },
});

export const authAction = authSlice.actions;

export default authSlice.reducer;
