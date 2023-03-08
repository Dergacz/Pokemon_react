import {
  errorPayload,
  pokemonEvolutionInitialState,
  pokemonPayload, pokemonSpeciesPayload,
} from '../mock';
import pokemonEvolutionSlice, {
  fetchPokemonEvolutionChainSuccess,
  fetchPokemonEvolutionChainPending,
  fetchPokemonEvolutionChainError, 
  fetchPokemonEvolutionChainSpeciesSuccess,
} from '../../reducers/pokemonEvolutionSlice';

describe('pokemonEvolutionSlice', () => {
  it('should return default state when passed an empty action', () => {
    const result = pokemonEvolutionSlice(pokemonEvolutionInitialState, {
      type: '',
    });
    expect(result.error).toEqual('');
    expect(result.pokemonEvolutionChain).toEqual([]);
    expect(result.pokemonEvolutionChainSpecies).toEqual([]);
  });

  it('should fetch pokemon evolution success', () => {
    const action = {
      type: fetchPokemonEvolutionChainSuccess.type,
      payload: [pokemonPayload],
    };
    const result = pokemonEvolutionSlice(pokemonEvolutionInitialState, action);
    expect(result.pokemonEvolutionChain[0]).toBeDefined();
  });

  it('should fetch pokemon evolution species success', () => {
    const action = {
      type: fetchPokemonEvolutionChainSpeciesSuccess.type,
      payload: [pokemonSpeciesPayload],
    };
    const result = pokemonEvolutionSlice(pokemonEvolutionInitialState, action);
    expect(result.pokemonEvolutionChainSpecies[0]).toBeDefined();
    expect(result.pokemonEvolutionChainSpecies[0].color.name).toBeDefined();
  });

  it('should pokemon evolution pending', () => {
    const action = {
      type: fetchPokemonEvolutionChainPending.type,
    };
    const result = pokemonEvolutionSlice(pokemonEvolutionInitialState, action);
    expect(result.isLoading).toBeTruthy();
    expect(result.error).toBeFalsy();
  });

  it('should pokemon evolution error', () => {
    const action = {
      type: fetchPokemonEvolutionChainError.type,
      payload: errorPayload,
    };
    const result = pokemonEvolutionSlice(pokemonEvolutionInitialState, action);
    expect(result.isLoading).toBeFalsy();
    expect(result.error).toBeTruthy();
  });
});
