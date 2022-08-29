import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'user',
  initialState: {
    email: '',
  },

  reducers: {
    saveUser(state, email) {
      return {
        ...state,
        email,
      };
    },
  },
});

export const { saveUser } = slice.actions;

export default slice.reducer;
