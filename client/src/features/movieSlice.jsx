import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovie: (state, action) => {
      state.movies = action.payload;
    },
  },
});

export const { setMovie } = moviesSlice.actions;
export default moviesSlice.reducer;


//handle testing
//deploy
// imdb , midtrans , sweetalert perbaiki
//node mailer
//search
//filter

//ide tambahan
//reset pass (fitur)
//upload image