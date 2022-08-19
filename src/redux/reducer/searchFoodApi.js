import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'saveFoodApi',
  initialState: {
    foodApi: '',
  },

  reducers: {
    saveFoodApi(state, foodApi) {
      return {
        ...state,
        foodApi: foodApi.payload,
      };
    },
  },
});

export const { saveFoodApi } = slice.actions;

export default slice.reducer;
