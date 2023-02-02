import React, { FC } from 'react';
import { Card } from '@nextui-org/react';

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
    <Card
      className='pokemon-card-wrapper'
      css={{ borderColor: `${setColor(color)}` }}
      isPressable
    >
      <Card.Header
        className='pokemon-card-id-wrapper'
        css={{ color: `${setColor(color)}` }}
      >
        <span>#{String(pokemon.id).padStart(3, '0')}</span>
      </Card.Header>
      <Card.Body css={{ width: 'auto', padding: '3px' }}>
        <Card.Image
          src={pokemon.sprites.front_default || defaultPokemon}
          objectFit='cover'
          width='100%'
          height='100%'
        />
      </Card.Body>
      <Card.Footer
        className='pokemon-card-footer'
        css={{ backgroundColor: `${setColor(color)}`, padding: '6px' }}
      >
        <span className='pokemon-card-name'>{name}</span>
      </Card.Footer>
    </Card>
  );
};
