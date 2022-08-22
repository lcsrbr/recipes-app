import { configureStore } from '@reduxjs/toolkit';
import user from '../reducer/user';
import searchFoodApi from '../reducer/searchFoodApi';
import searchCocktailApi from '../reducer/searchCocktailApi';

const store = configureStore({
  reducer: {
    user,
    searchFoodApi,
    searchCocktailApi,
  },
});

export default store;
