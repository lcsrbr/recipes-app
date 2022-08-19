import { configureStore } from '@reduxjs/toolkit';
import user from '../reducer/user';

const store = configureStore({
  reducer: { user },
});

export default store;
