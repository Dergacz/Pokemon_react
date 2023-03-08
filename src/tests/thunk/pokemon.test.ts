import { fetchPokemon, fetchPokemonByType, fetchPokemons, fetchPokemonTypes } from '../../actions/pokemonAction';
import * as mock from '../mock';

describe('fetch pokemons', () => {
  it('should fetch pokemons success', async () => {
    const thunk = fetchPokemons();
    const dispatch = jest.fn();
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [pending, pokemons] = calls;
    expect(pending[0].type).toBe('pokemon/pokemonsPending');
    expect(pending[0].payload).toBeFalsy();
    expect(pokemons[0].type).toBe('pokemon/fetchPokemonsSuccess');
  });
});

describe('fetch pokemon', () => {
  it('should fetch pokemon success', async () => {
    const thunk = fetchPokemon([mock.pokemonPreview]);
    const dispatch = jest.fn();
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [pending, pokemon] = calls;
    expect(pending[0].type).toBe('pokemon/pokemonsPending');
    expect(pending[0].payload).toBeFalsy();
    expect(pokemon[0].type).toBe('pokemon/fetchPokemonSuccess');
    expect(pokemon[0].payload[0].name).toBe(mock.pokemonName);
  });

  it('should fetch pokemon error', async () => {
    const thunk = fetchPokemon([mock.wrongPokemonPreview]);
    const dispatch = jest.fn();
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [pending, error] = calls;
    expect(pending[0].type).toBe('pokemon/pokemonsPending');
    expect(pending[0].payload).toBeFalsy();
    expect(error[0].type).toBe('pokemon/pokemonError');
  });
});

describe('fetch pokemon types', () => {
  it('should fetch pokemon types success', async () => {
    const thunk = fetchPokemonTypes();
    const dispatch = jest.fn();
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [pending, types] = calls;
    expect(pending[0].type).toBe('pokemon/pokemonsPending');
    expect(pending[0].payload).toBeFalsy();
    expect(types[0].type).toBe('pokemon/fetchPokemonTypesSuccess');
    expect(types[0].payload[0].name).toBeTruthy();
  });
});

describe('fetch pokemon by type', () => {
  it('should fetch pokemon by type success', async () => {
    const thunk = fetchPokemonByType(mock.pokemonTypeName);
    const dispatch = jest.fn();
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [pending, type] = calls;
    expect(pending[0].type).toBe('pokemon/pokemonsPending');
    expect(pending[0].payload).toBeFalsy();
    expect(type[0].type).toBe('pokemon/fetchPokemonByTypeSuccess');
    expect(type[0].payload.name).toEqual(mock.pokemonTypeName);
  });

  it('should fetch pokemon by type error', async () => {
    const thunk = fetchPokemonByType(mock.wrongPokemonName);
    const dispatch = jest.fn();
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [pending, type] = calls;
    expect(pending[0].type).toBe('pokemon/pokemonsPending');
    expect(pending[0].payload).toBeFalsy();
    expect(type[0].type).toBe('pokemon/pokemonError');
    expect(type[0].payload.name).toEqual('AxiosError');
  });
});
