import { IPokemon } from '../../models/models';

export interface IPokemonEvolution {
  pokemonEvolutionChain: IPokemon[];
  color: string;
}
