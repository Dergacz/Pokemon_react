import React, { FC } from 'react';
import { IPokemonCard } from './PokemonCard.types';
import { Card } from '@nextui-org/react';
import { pokemonTypes } from '../../utils/pokemonTypes';

export const PokemonCard: FC<IPokemonCard> = ({ name, pokemon }) => {
  const [{ color }] = pokemonTypes.filter(
    (type) => type?.name === pokemon?.types[0]?.type?.name,
  );

  return (
    <Card
      className='pokemon-card-wrapper'
      style={{ borderColor: `${color}` }}
      isPressable
    >
      <Card.Header
        className='pokemon-card-id-wrapper'
        style={{ color: `${color}` }}
      >
        <span>#{String(pokemon.id).padStart(3, '0')}</span>
      </Card.Header>
      <Card.Body style={{ width: 'auto', padding: '3px' }}>
        <Card.Image
          src={pokemon.sprites.front_default}
          objectFit='cover'
          width='100%'
          height='100%'
        />
      </Card.Body>
      <Card.Footer
        className='pokemon-card-footer'
        style={{ backgroundColor: `${color}`, padding: '6px' }}
      >
        <span className='pokemon-card-name'>{name}</span>
      </Card.Footer>
    </Card>
  );
};
