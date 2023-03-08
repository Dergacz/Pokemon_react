import pokemonReducer, {
  clearErrorSuccess,
  clearPokemonTypeSuccess,
  fetchPokemonByTypeSuccess,
  fetchPokemonsSuccess,
  fetchPokemonSuccess, fetchPokemonTypesSuccess,
  pokemonError,
  pokemonsPending, setCurrentPageSuccess,
} from '../../reducers/pokemonSlice';
import {
  currentPagePayload,
  errorPayload,
  fetchPokemonsPayload,
  pokemonPayload,
  pokemonSliceInitialState, pokemonTypeName,
  pokemonTypePreview,
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
      payload: [pokemonPayload],
    };
    const result = pokemonReducer(pokemonSliceInitialState, action);
    expect(result.pokemonsArray.length).toBeDefined();
    expect(result.pokemonsArray[0].name).toEqual('name');
  });

  it('should fetch pokemon types success', () => {
    const action = {
      type: fetchPokemonTypesSuccess.type,
      payload: [pokemonTypePreview],
    };
    const result = pokemonReducer(pokemonSliceInitialState, action);
    expect(result.pokemonTypes.length).toBeDefined();
    expect(result.pokemonTypes[0].name).toEqual(pokemonTypeName);
  });

  it('should fetch pokemon by type success', () => {
    const action = {
      type: fetchPokemonByTypeSuccess.type,
      payload: pokemonPayload,
    };
    const result = pokemonReducer(pokemonSliceInitialState, action);
    expect(result.pokemonsArray).toEqual([]);
    expect(result.currentPage).toEqual(0);
    expect(result.pokemonCurrentType.name).toEqual('name');
    expect(result.isLoading).toBeFalsy();
  });

  it('should fetch current page success', () => {
    const action = {
      type: setCurrentPageSuccess.type,
      payload: currentPagePayload,
    };
    const result = pokemonReducer(pokemonSliceInitialState, action);
    expect(result.currentPage).toBeDefined();
    expect(result.pokemonsArray).toEqual([]);
    expect(result.currentPage).toEqual(1);
  });

  it('should clear pokemon type success', () => {
    const action = {
      type: clearPokemonTypeSuccess.type,
    };
    const result = pokemonReducer(pokemonSliceInitialState, action);
    expect(result.pokemonCurrentType).toBeNull();
    expect(result.currentPage).toEqual(0);
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

  it('should pokemon clear error', () => {
    const action = {
      type: clearErrorSuccess.type,
    };
    const result = pokemonReducer(pokemonSliceInitialState, action);
    expect(result.isLoading).toBeFalsy();
    expect(result.error).toBeFalsy();
  });
});
