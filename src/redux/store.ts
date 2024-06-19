import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./features/newsSlice";

const store = configureStore({
  reducer: { newsReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
