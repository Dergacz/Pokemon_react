
interface IPokemonPreview {
  name: string;
  url: string;
}
export interface IFetchPokemons {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPokemonPreview[];
}

interface ISprites {
  front_default: string;
}

interface ITypes {
  slot: number;
  type: IPokemonPreview;
}

interface IAbilities {
  ability: IPokemonPreview;
  is_hidden: boolean;
  slot: number;
}

interface IStats {
  base_stat: number;
  effort: number;
  stat: IPokemonPreview;
}

export interface IPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  stats: IStats[];
  abilities: IAbilities[];
  sprites: ISprites;
  types: ITypes[];
}

export interface IPokemonSpecies {
  name: string;
  color: IPokemonPreview;
}

export interface IEvolvesTo {
  species: IPokemonPreview;
  evolves_to: IEvolvesTo[];
}

export interface IEvolutionChain {
  species: IPokemonPreview;
  evolves_to: IEvolvesTo[];
}

export interface IFetchEvolutionChain {
  id: number;
  chain: IEvolutionChain;
}

export interface IFetchPokemonSpecies {
  name: string;
  evolution_chain: {
    url: string;
  }
}
