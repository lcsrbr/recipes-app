import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    password: '',
  },

  reducers: {
    saveUser(state, { email, password }) {
      return {
        ...state,
        email,
        password,
      };
    },
  },
});

export const { saveUser } = slice.actions;

export default slice.reducer;
