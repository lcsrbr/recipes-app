import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'ingredients',
  initialState: {
    ingredients: 0,
  },

  reducers: {
    saveIngredietns(state, ingredients) {
      return {
        ...state,
        ingredients: state.ingredients + ingredients.payload,
      };
    },
  },
});

export const { saveIngredietns } = slice.actions;

export default slice.reducer;
