import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '../reducers/pokemonSlice';
import pokemonEvolutionReducer from '../reducers/pokemonEvolutionSlice';
import pokemonSpeciesReducer from '../reducers/pokemonSpeciesSlice';
import searchPokemonReducer from '../reducers/searchPokemonSlice';
import appAgentReducer from '../reducers/appAgentSlice';

export const store = configureStore({
  reducer: {
    pokemonReducer,
    pokemonEvolutionReducer,
    pokemonSpeciesReducer,
    searchPokemonReducer,
    appAgentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
