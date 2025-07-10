import billReducer from './modules/billStore.js';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    bill: billReducer,
  },
})

export default store;