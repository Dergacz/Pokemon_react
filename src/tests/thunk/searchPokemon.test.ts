import { fetchSearchPokemon } from '../../actions/searchPokemonAction';
import { pokemonName, wrongPokemonName } from '../mock';

describe('fetch search pokemon', () => {
  it('should fetch search pokemon success', async () => {
    const thunk = fetchSearchPokemon(pokemonName);
    const dispatch = jest.fn();
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(3);
    const [pending, pokemon, species] = calls;
    expect(pending[0].type).toBe('searchPokemon/fetchSearchPokemonPending');
    expect(pending[0].payload).toBeFalsy();
    expect(pokemon[0].type).toBe('searchPokemon/fetchSearchPokemonSuccess');
    expect(pokemon[0].payload.name).toBe(pokemonName);
    expect(species[0].type).toBe('searchPokemon/fetchSearchPokemonSpeciesSuccess');
    expect(species[0].payload.id).toBe(172);
  });

  it('should fetch search pokemon error', async () => {
    const thunk = fetchSearchPokemon(wrongPokemonName);
    const dispatch = jest.fn();
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [pending, error] = calls;
    expect(pending[0].type).toBe('searchPokemon/fetchSearchPokemonPending');
    expect(pending[0].payload).toBeFalsy();
    expect(error[0].type).toBe('searchPokemon/searchPokemonError');
    expect(error[0].payload.name).toBe('AxiosError');
  });
});
