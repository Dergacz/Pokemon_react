import React, { FC } from 'react';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import { Grid, Loading } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';

export const PokemonList: FC = () => {
  const { pokemons, pokemonsArray, pokemonsSpecies, isLoading } = useAppSelector(
    (state) => state.pokemonReducer
  );

  return (
    <div className='pokemon-list-wrapper'>
      {isLoading && <Loading size='xl' />}
      <Grid.Container gap={2} css={{ justifyContent: 'space-between' }}>
        {!isLoading &&
          pokemons &&
          pokemonsArray.map((pokemon) => {
            const pokemonSpecies = pokemonsSpecies?.find(p => p.name === pokemon.name);
            return (
              <Grid xs={4} key={pokemon.id} css={{ flexBasis: '0' }}>
                <Link to={pokemon.name}>
                  <PokemonCard name={pokemon.name} pokemon={pokemon} pokemonSpecies={pokemonSpecies} />
                </Link>
              </Grid>
            );
          })}
      </Grid.Container>
    </div>
  );
};
