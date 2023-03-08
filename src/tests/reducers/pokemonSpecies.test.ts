import {
  errorPayload,
  pokemonSpeciesPayload,
  pokemonSpeciesSliceInitialState,
} from '../mock';
import pokemonSpeciesSlice, {
  fetchPokemonSpeciesError,
  fetchPokemonSpeciesPending,
  fetchPokemonSpeciesSuccess,
} from '../../reducers/pokemonSpeciesSlice';

describe('pokemonSpeciesSlice', () => {
  it('should return default state when passed an empty action', () => {
    const result = pokemonSpeciesSlice(pokemonSpeciesSliceInitialState, {
      type: '',
    });
    expect(result.error).toEqual('');
    expect(result.pokemonsSpecies).toEqual([]);
  });

  it('should fetch pokemon species success', () => {
    const action = {
      type: fetchPokemonSpeciesSuccess.type,
      payload: pokemonSpeciesPayload,
    };
    const result = pokemonSpeciesSlice(pokemonSpeciesSliceInitialState, action);
    expect(result.pokemonsSpecies[0]).toBeDefined();
    expect(result.pokemonsSpecies[0].color.name).toBeDefined();
  });

  it('should pokemon species pending', () => {
    const action = {
      type: fetchPokemonSpeciesPending.type,
    };
    const result = pokemonSpeciesSlice(pokemonSpeciesSliceInitialState, action);
    expect(result.isLoading).toBeTruthy();
    expect(result.error).toBeFalsy();
  });

  it('should pokemon species error', () => {
    const action = {
      type: fetchPokemonSpeciesError.type,
      payload: errorPayload,
    };
    const result = pokemonSpeciesSlice(pokemonSpeciesSliceInitialState, action);
    expect(result.isLoading).toBeFalsy();
  });
});
