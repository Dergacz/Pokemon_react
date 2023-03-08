import { fetchPokemonEvolutionChainAction } from '../../actions/pokemonEvolutionAction';
import * as mock from '../mock';

describe('fetch evolution pokemon', () => {
  it('should fetch evolution pokemon success', async () => {
    const thunk = fetchPokemonEvolutionChainAction(mock.evolutionChainUrl);
    const dispatch = jest.fn();
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(3);
    const [pending, species, pokemon] = calls;
    expect(pending[0].type).toBe('pokemonEvolution/fetchPokemonEvolutionChainPending');
    expect(pending[0].payload).toBeFalsy();
    expect(species[0].type).toBe('pokemonEvolution/fetchPokemonEvolutionChainSpeciesSuccess');
    expect(species[0].payload[0].id).toBeTruthy();
    expect(pokemon[0].type).toBe('pokemonEvolution/fetchPokemonEvolutionChainSuccess');
    expect(pokemon[0].payload[0].id).toBeTruthy();
  });

  it('should fetch evolution pokemon success', async () => {
    const thunk = fetchPokemonEvolutionChainAction(mock.wrongEvolutionChainUrl);
    const dispatch = jest.fn();
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [pending, error] = calls;
    expect(pending[0].type).toBe('pokemonEvolution/fetchPokemonEvolutionChainPending');
    expect(pending[0].payload).toBeFalsy();
    expect(error[0].type).toBe('pokemonEvolution/fetchPokemonEvolutionChainError');
    expect(error[0].payload).toBeTruthy();
  });
});
