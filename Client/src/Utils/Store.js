import { configureStore } from "@reduxjs/toolkit";
import BoardReducer from "../Redux/Board/BoardSlice";

export const store = configureStore({
  reducer: {
    board: BoardReducer,
  },
});
