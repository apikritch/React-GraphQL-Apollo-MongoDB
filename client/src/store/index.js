import { configureStore } from "@reduxjs/toolkit";
import snackbarReducer from "./features/snackbarSlice";
import authReducer from "./features/authSlice";

const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    auth: authReducer,
  },
});

export default store;
