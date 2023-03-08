import { fetchPokemonSpecies } from '../../actions/pokemonSpeciesAction';
import { pokemonName, wrongPokemonName } from '../mock';

describe('fetch pokemon species', () => {
  it('should fetch pokemon species success', async () => {
    const thunk = fetchPokemonSpecies(pokemonName);
    const dispatch = jest.fn();
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [pending, species] = calls;
    expect(pending[0].type).toBe('pokemonSpecies/fetchPokemonSpeciesPending');
    expect(pending[0].payload).toBeFalsy();
    expect(species[0].type).toBe('pokemonSpecies/fetchPokemonSpeciesSuccess');
    expect(species[0].payload.name).toBe('pichu');
  });

  it('should fetch pokemon species error', async () => {
    const thunk = fetchPokemonSpecies(wrongPokemonName);
    const dispatch = jest.fn();
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [pending, error] = calls;
    expect(pending[0].type).toBe('pokemonSpecies/fetchPokemonSpeciesPending');
    expect(pending[0].payload).toBeFalsy();
    expect(error[0].type).toBe('pokemonSpecies/fetchPokemonSpeciesError');
    expect(error[0].payload.name).toBe('AxiosError');
  });
});
