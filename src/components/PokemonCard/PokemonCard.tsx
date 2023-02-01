import React, { FC } from 'react';
import { IPokemonCard } from './PokemonCard.types';
import { Card } from '@nextui-org/react';
import defaultPokemon from '../../../public/images/pokemon-default.png';
import * as constants from '../../constants/constatns';

export const PokemonCard: FC<IPokemonCard> = ({
  name,
  pokemon,
  pokemonSpecies,
}) => {
  const setColor = () => {
    if (pokemonSpecies?.color.name === constants.WHITE) {
      return constants.ICE_COLOR;
    }
    if (pokemonSpecies?.color.name) {
      return pokemonSpecies?.color.name;
    }
    return constants.DEFAULT_COLOR;
  };

  return (
    <Card
      className='pokemon-card-wrapper'
      css={{ borderColor: `${setColor()}` }}
      isPressable
    >
      <Card.Header
        className='pokemon-card-id-wrapper'
        css={{ color: `${setColor()}` }}
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
        css={{ backgroundColor: `${setColor()}`, padding: '6px' }}
      >
        <span className='pokemon-card-name'>{name}</span>
      </Card.Footer>
    </Card>
  );
};
