import { configureStore } from '@reduxjs/toolkit';
import user from '../reducer/user';
import searchFoodApi from '../reducer/searchFoodApi';
import searchCocktailApi from '../reducer/searchCocktailApi';
import ingredients from '../reducer/ingredients';

const store = configureStore({
  reducer: {
    user,
    searchFoodApi,
    searchCocktailApi,
    ingredients,
  },
});

export default store;
