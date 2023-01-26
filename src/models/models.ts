
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
  type: {
    name: string;
    url: string;
  }
}

interface IAbilities {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface IPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: IAbilities[];
  sprites: ISprites;
  types: ITypes[];
}

export interface IPokemonSpecies {
  name: string;
  color: {
    name: string;
    url: string;
  }
}
