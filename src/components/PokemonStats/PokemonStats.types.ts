import { IPokemon, IPokemonSpecies } from '../../models/models';

export interface IPokemonStats {
  pokemon: IPokemon;
  pokemonSpecies: IPokemonSpecies;
  color: string;
}
