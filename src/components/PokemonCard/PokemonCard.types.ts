import { IPokemon, IPokemonSpecies } from '../../models/models';

export interface IPokemonCard {
  name: string;
  pokemon: IPokemon;
  pokemonSpecies: IPokemonSpecies;
}
