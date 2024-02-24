import { configureStore } from "@reduxjs/toolkit";
import BoardReducer from "../Redux/Board/BoardSlice";
import UserReducer from "../Redux/User/UserSlice";

export const store = configureStore({
  reducer: {
    board: BoardReducer,
    user: UserReducer,
  },
});
