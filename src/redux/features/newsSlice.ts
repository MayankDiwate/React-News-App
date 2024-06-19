import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NewsType } from "../../utils/types";

type NewsState = {
  news: NewsType[];
};

const initialState: NewsState = {
  news: [],
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNews: (state: NewsState, action: PayloadAction<NewsType[]>) => {
      state.news = action.payload;
    },
  },
});

export const { setNews } = newsSlice.actions;

export default newsSlice.reducer;
