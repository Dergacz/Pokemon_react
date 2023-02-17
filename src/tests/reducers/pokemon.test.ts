import pokemonReducer, {
  fetchPokemonsSuccess,
  fetchSearchPokemonSuccess,
  fetchPokemonSpeciesSuccess,
  fetchPokemonEvolutionChainSuccess,
  pokemonsPending,
  fetchPokemonSuccess,
  pokemonError,
  pokemonSpeciesError,
} from '../../reducers/pokemonSlice';
import {
  errorPayload,
  fetchPokemonsPayload,
  pokemonEvolutionChainPayload,
  pokemonPayload,
  pokemonSliceInitialState,
  pokemonSpeciesPayload,
} from '../mock';

describe('pokemonSlice', () => {
  it('should return default state when passed an empty action', () => {
    const result = pokemonReducer(pokemonSliceInitialState, {
      type: '',
    });
    expect(result.pokemons).toBeNull();
    expect(result.pokemonsArray).toEqual([]);
  });

  it('should fetch pokemons success', () => {
    const action = {
      type: fetchPokemonsSuccess.type,
      payload: fetchPokemonsPayload,
    };
    const result = pokemonReducer(pokemonSliceInitialState, action);
    expect(result.pokemons.results.length).toEqual(1);
    expect(result.pokemons.next).toEqual('next');
  });

  it('should fetch pokemon success', () => {
    const action = {
      type: fetchPokemonSuccess.type,
      payload: pokemonPayload,
    };
    const result = pokemonReducer(pokemonSliceInitialState, action);
    expect(result.pokemonsArray.length).toBeDefined();
    expect(result.pokemonsArray[0].name).toEqual('name');
  });

  it('should fetch pokemon species success', () => {
    const action = {
      type: fetchPokemonSpeciesSuccess.type,
      payload: pokemonSpeciesPayload,
    };
    const result = pokemonReducer(pokemonSliceInitialState, action);
    expect(result.pokemonsSpecies[0]).toBeDefined();
    expect(result.pokemonsSpecies[0].color.name).toBeDefined();
  });

  it('should fetch search pokemon success', () => {
    const action = {
      type: fetchSearchPokemonSuccess.type,
      payload: pokemonPayload,
    };
    const result = pokemonReducer(pokemonSliceInitialState, action);
    expect(result.pokemonsArray[0]).toBeDefined();
  });

  it('should pokemon evolution chain', () => {
    const action = {
      type: fetchPokemonEvolutionChainSuccess.type,
      payload: pokemonEvolutionChainPayload,
    };
    const result = pokemonReducer(pokemonSliceInitialState, action);
    expect(result.pokemonEvolutionChain[0]).toBeDefined();
  });

  it('should pokemon pending', () => {
    const action = {
      type: pokemonsPending.type,
    };
    const result = pokemonReducer(pokemonSliceInitialState, action);
    expect(result.isLoading).toBeTruthy();
    expect(result.error).toBeFalsy();
  });

  it('should pokemon error', () => {
    const action = {
      type: pokemonError.type,
      payload: errorPayload,
    };
    const result = pokemonReducer(pokemonSliceInitialState, action);
    expect(result.isLoading).toBeFalsy();
    expect(result.error).toBeTruthy();
  });

  it('should pokemon species error', () => {
    const action = {
      type: pokemonSpeciesError.type,
    };
    const result = pokemonReducer(pokemonSliceInitialState, action);
    expect(result.isLoading).toBeFalsy();
    expect(result.pokemonEvolutionChain[0]).toBeFalsy();
  });
});
