import React, { FC } from 'react';
import { Card, Grid } from '@nextui-org/react';
import { Link } from 'react-router-dom';

// types
import { IPokemonCard } from './PokemonCard.types';

// images
import defaultPokemon from '../../../public/images/pokemon-default.png';

// utils
import { setColor } from '../../../utils/setColor';

export const PokemonCard: FC<IPokemonCard> = ({
  name,
  pokemon,
  pokemonSpecies,
}) => {

  const color = pokemonSpecies?.color.name;

  return (
    <Grid xs={4} key={pokemon.id} css={{ justifyContent: 'center' }}>
      <Link to={name}>
        <Card
          className='pokemon-card-wrapper'
          css={{ borderColor: `${setColor(color)}`, width: '150px' }}
          isPressable
        >
          <Card.Header
            className='pokemon-card-id-wrapper'
            css={{ color: `${setColor(color)}`, justifyContent: 'end', paddingBottom: '0' }}
          >
            <span>#{String(pokemon.id).padStart(3, '0')}</span>
          </Card.Header>
          <Card.Body css={{ width: 'auto', padding: '3px' }}>
            <Card.Image
              src={pokemon.sprites?.other['official-artwork'].front_default || defaultPokemon}
              objectFit='contain'
              width='130px'
              height='140px'
            />
          </Card.Body>
          <Card.Footer
            className='pokemon-card-footer'
            css={{ backgroundColor: `${setColor(color)}`, padding: '6px' }}
          >
            <span className='pokemon-card-name'>{name}</span>
          </Card.Footer>
        </Card>
      </Link>
    </Grid>
  );
};
