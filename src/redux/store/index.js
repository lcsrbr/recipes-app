import { configureStore } from '@reduxjs/toolkit';
import user from '../reducer/user';
import searchFoodApi from '../reducer/searchFoodApi';

const store = configureStore({
  reducer: { user, searchFoodApi },
});

export default store;
