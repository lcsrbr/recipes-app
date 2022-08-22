import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'savecocktailApi',
  initialState: {
    cocktailApi: '',
  },

  reducers: {
    saveCocktailApi(state, cocktail) {
      return {
        ...state,
        cocktailApi: cocktail.payload,
      };
    },
  },
});

export const { saveCocktailApi } = slice.actions;

export default slice.reducer;
