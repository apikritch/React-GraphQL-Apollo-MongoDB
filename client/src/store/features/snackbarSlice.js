import { createSlice } from "@reduxjs/toolkit";
const { v4: uuidv4 } = require("uuid");

const initialSnackbarState = {
  snackbardata: [],
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: initialSnackbarState,
  reducers: {
    open(state, action) {
      state.snackbardata.push({
        id: uuidv4(),
        open: true,
        message: action.payload.message,
        severity: action.payload.severity,
        hide: action.payload.hide === false ? false : true,
      });
    },
    close(state, action) {
      state.snackbardata = state.snackbardata.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const snackbarAction = snackbarSlice.actions;

export default snackbarSlice.reducer;
