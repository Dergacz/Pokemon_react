import React, { FC, useEffect, useState } from 'react';
import { Grid, Loading } from '@nextui-org/react';

// types
import { IPokemonList } from './PokemonList.types';
import { IPokemon } from '../../models/models';

// components
import { PokemonCard } from '../PokemonCard/PokemonCard';

// hooks
import { useAppSelector } from '../../hooks/hooks';

export const PokemonList: FC<IPokemonList> = ({
  searchPokemon,
}) => {
  const { pokemons, pokemonsArray, isLoading, error } = useAppSelector((state) => state.pokemonReducer);
  const { pokemonsSpecies } = useAppSelector((state) => state.pokemonSpeciesReducer);
  const { searchedPokemon, isLoading: isLoadingSearchedPokemon, error: searchError } = useAppSelector((state) => state.searchPokemonReducer);

  const [currentPokemons, setCurrentPokemons] = useState<IPokemon[]>([]);

  useEffect(() => {
    if (searchPokemon && searchedPokemon) {
      setCurrentPokemons([searchedPokemon]);
    } else if (pokemons) {
      setCurrentPokemons(pokemonsArray);
    }
  }, [searchPokemon, searchedPokemon, pokemons, pokemonsArray]);

  return (
    <div className='pokemon-list-wrapper'>
      {(isLoading || isLoadingSearchedPokemon) && <Loading size='xl' />}
      <Grid.Container
        gap={2}
        css={{
          justifyContent:
            (error || searchError || searchedPokemon) ? 'center' : 'space-between',
        }}
      >
        {(!isLoading || !isLoadingSearchedPokemon) &&
          !error &&
          !searchError &&
          currentPokemons.map((pokemon) => {
            const pokemonSpecies = pokemonsSpecies?.find(p => p.name === pokemon.name);
            return (
              <PokemonCard key={pokemon.name} name={pokemon.name} pokemon={pokemon} pokemonSpecies={pokemonSpecies} />
            );
          })}
        {error && <h2>{error}</h2>}
        {searchError && <h2>Invalid pokemon name</h2>}
      </Grid.Container>
    </div>
  );
};
