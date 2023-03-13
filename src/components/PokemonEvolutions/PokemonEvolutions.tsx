import React, { FC } from 'react';
import { Link } from 'react-router-dom';

// types
import { IPokemonEvolution } from './PokemonEvolution.types';

// images
import arrowLogo from '../../../public/images/arrow-evolution.png';
import defaultPokemon from '../../../public/images/pokemon-default.png';

export const PokemonEvolutions: FC<IPokemonEvolution> = ({
  pokemonEvolutionChain,
  color,
}) => (
  <>
    <h3 className={`evolution-title color-${color || 'default'}`}>Evolution</h3>
    <div className='evolution-chain'>
      {pokemonEvolutionChain.map((pokemon, index: number) => (
        <React.Fragment key={pokemon.id}>
          {index !== 0 && (
            <div className='evolution-level'>
              <img className='evolution-arrow' src={arrowLogo} alt='arrow' />
            </div>
          )}
          <div>
            <div className='evolution-pokemon'>
              <Link to={`/${pokemon.name}`}>
                <img src={pokemon.sprites.other['official-artwork'].front_default || defaultPokemon} alt='pokemon-front' width={80} height={80}/>
              </Link>
              <p className='evolution-name'>{pokemon.name}</p>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
    <h3 className='evolution-switch'>Click to switch to another Pokémon</h3>
  </>
);
