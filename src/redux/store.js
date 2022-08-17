import { configureStore } from '@reduxjs/toolkit';
import CocktailReducer from './slice/cocktail-slice';

export default configureStore({
  reducer: {
    app: CocktailReducer,
  },
});
