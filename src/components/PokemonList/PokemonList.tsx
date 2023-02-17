import React, { FC } from 'react';
import { Grid, Loading } from '@nextui-org/react';
import { Link } from 'react-router-dom';

// components
import { PokemonCard } from '../PokemonCard/PokemonCard';

// hooks
import { useAppSelector } from '../../hooks/hooks';

export const PokemonList: FC = () => {
  const { pokemons, pokemonsArray, pokemonsSpecies, isLoading, error } = useAppSelector(
    (state) => state.pokemonReducer
  );

  return (
    <div className='pokemon-list-wrapper' style={{ minHeight: '723px' }}>
      {isLoading && <Loading size='xl' />}
      <Grid.Container
        gap={2}
        css={{
          justifyContent:
            error || pokemonsArray.length === 1 ? 'center' : 'space-between',
        }}
      >
        {!isLoading &&
          pokemons &&
          !error &&
          pokemonsArray.map((pokemon) => {
            const pokemonSpecies = pokemonsSpecies?.find(p => p.name === pokemon.name);
            return (
              <Grid xs={4} key={pokemon.id} css={{ justifyContent: 'center' }}>
                <Link to={pokemon.name}>
                  <PokemonCard name={pokemon.name} pokemon={pokemon} pokemonSpecies={pokemonSpecies} />
                </Link>
              </Grid>
            );
          })}
        {error && <h2>Invalid pokemon name</h2>}
      </Grid.Container>
    </div>
  );
};
