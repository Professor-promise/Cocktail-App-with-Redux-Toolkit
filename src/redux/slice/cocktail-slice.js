import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCocktail = createAsyncThunk(
  'cocktails/fetchCocktails',
  async () => {
    return fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
    ).then(res => res.json());
  }
);

export const fetchSingleCocktail = createAsyncThunk(
  'cocktails/fetchSingleCocktail',
  async ({ id }) => {
    return fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    ).then(res => res.json());
  }
);
export const fetchSearchCoctail = createAsyncThunk(
  'cocktails/fetchSearchCoctail',
  async ({ searchText }) => {
    return fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`
    ).then(res => res.json());
  }
);

export const cocktailSlice = createSlice({
  name: 'cocktail',
  initialState: {
    cocktails: [],
    cocktail: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [fetchCocktail.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchCocktail.fulfilled]: (state, action) => {
      state.cocktails = action.payload.drinks;
      state.loading = false;
    },
    [fetchCocktail.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [fetchSingleCocktail.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchSingleCocktail.fulfilled]: (state, action) => {
      state.cocktail = action.payload.drinks;
      state.loading = false;
    },
    [fetchSingleCocktail.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [fetchSearchCoctail.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchSearchCoctail.fulfilled]: (state, action) => {
      state.cocktails = action.payload.drinks;
      state.loading = false;
    },
    [fetchSearchCoctail.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default cocktailSlice.reducer;
