// themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    value: 'indigo', // Set the initial theme value to 'light'
  },
  reducers: {
    setTheme: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
