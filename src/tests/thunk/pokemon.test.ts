import {
  fetchPokemon,
  fetchPokemons,
  fetchPokemonSpecies,
  fetchSearchPokemon,
} from '../../actions/actionCreaters';

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

  // it('should fetch pokemons error', async () => {
  //   const thunk = fetchPokemons();
  //   const dispatch = jest.fn();
  //   await thunk(dispatch);
  //   const { calls } = dispatch.mock;
  //   expect(calls).toHaveLength(2);
  //   const [start, end] = calls;
  //   expect(start[0].type).toBe('pokemon/pokemonsPending');
  //   expect(start[0].payload).toBeFalsy();
  //   // expect(end[0].type).toBe('pokemon/fetchPokemonsError');
  // });
});

describe('fetch pokemon', () => {
  it('should fetch pokemon success', async () => {
    const thunk = fetchPokemon('pichu');
    const dispatch = jest.fn();
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [pending, pokemon] = calls;
    expect(pending[0].type).toBe('pokemon/pokemonsPending');
    expect(pending[0].payload).toBeFalsy();
    expect(pokemon[0].type).toBe('pokemon/fetchPokemonSuccess');
    expect(pokemon[0].payload.name).toBe('pichu');
  });

  it('should fetch pokemon error', async () => {
    const thunk = fetchPokemon('wrongName');
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

describe('fetch pokemon species', () => {
  it('should fetch pokemon species success', async () => {
    const thunk = fetchPokemonSpecies('pichu');
    const dispatch = jest.fn();
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [pending, species] = calls;
    expect(pending[0].type).toBe('pokemon/pokemonsPending');
    expect(pending[0].payload).toBeFalsy();
    expect(species[0].type).toBe('pokemon/fetchPokemonSpeciesSuccess');
    expect(species[0].payload.name).toBe('pichu');
  });

  it('should fetch pokemon species error', async () => {
    const thunk = fetchPokemonSpecies('wrongName');
    const dispatch = jest.fn();
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [pending, error] = calls;
    expect(pending[0].type).toBe('pokemon/pokemonsPending');
    expect(pending[0].payload).toBeFalsy();
    expect(error[0].type).toBe('pokemon/pokemonSpeciesError');
    expect(error[0].payload.name).toBe('AxiosError');
  });
});

describe('fetch search pokemon', () => {
  it('should fetch search pokemon success', async () => {
    const thunk = fetchSearchPokemon('pichu');
    const dispatch = jest.fn();
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(3);
    const [pending, pokemon, species] = calls;
    expect(pending[0].type).toBe('pokemon/pokemonsPending');
    expect(pending[0].payload).toBeFalsy();
    expect(pokemon[0].type).toBe('pokemon/fetchSearchPokemonSuccess');
    expect(pokemon[0].payload.name).toBe('pichu');
    expect(species[0].type).toBe('pokemon/fetchPokemonSpeciesSuccess');
    expect(species[0].payload.id).toBe(172);
  });

  it('should fetch search pokemon error', async () => {
    const thunk = fetchSearchPokemon('wrongName');
    const dispatch = jest.fn();
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [pending, error] = calls;
    expect(pending[0].type).toBe('pokemon/pokemonsPending');
    expect(pending[0].payload).toBeFalsy();
    expect(error[0].type).toBe('pokemon/searchPokemonError');
    expect(error[0].payload.name).toBe('AxiosError');
  });
});
