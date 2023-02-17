import React, { FC } from 'react';
import { Progress } from '@nextui-org/react';

// images
import weightLogo from '../../../public/images/weight.png';
import heightLogo from '../../../public/images/height.png';

// types
import { IPokemonStats } from './PokemonStats.types';

// constants
import * as constants from '../../constants/constatns';

// utils
import { setColor } from '../../../utils/setColor';

export const PokemonStats: FC<IPokemonStats> = ({ pokemon, color }) => (
  <div className={`pokemon-stats-description border-${color || 'default'}`}>
    <div className='pokemon-stats-spell-wrapper'>
      {pokemon.types.map((type) => {
        return (
          <div
            key={type.type.name}
            className={`pokemon-stats-spell background-${color || 'default'}`}
          >
            <span className='pokemon-stats-spell-name'>{type.type.name}</span>
          </div>
        );
      })}
    </div>
    <h3 className={`pokemon-stats-about-title color-${color || 'default'}`}>
      About
    </h3>
    <div className='pokemon-stats-about-wrapper'>
      <div className='pokemon-stats-about-argument'>
        <div className='pokemon-stats-about-description'>
          <img src={weightLogo} alt='weight' />
          <p className='pokemon-stats-about-weight'>
            {pokemon.weight / 10} kg
          </p>
        </div>
        <p className='pokemon-stats-about-subtitle'>Weight</p>
      </div>
      <div className='pokemon-stats-about-border' />
      <div className='pokemon-stats-about-argument'>
        <div className='pokemon-stats-about-description'>
          <img src={heightLogo} alt='height' />
          <p className='pokemon-stats-about-height'>
            {pokemon.height / 10} m
          </p>
        </div>
        <p className='pokemon-stats-about-subtitle'>Height</p>
      </div>
      <div className='pokemon-stats-about-border' />
      <div className='pokemon-stats-about-argument'>
        {pokemon.abilities.map((ability) => (
          <p
            className='pokemon-stats-about-ability'
            key={ability.ability.name}
          >
            {ability.ability.name}
          </p>
        ))}
        <p className='pokemon-stats-about-subtitle'>Movies</p>
      </div>
    </div>
    <div className='pokemon-stats-wrapper'>
      <h3 className={`pokemon-stats-title color-${color || 'default'}`}>
        Base stats
      </h3>
      <div className='pokemon-stats-values'>
        {pokemon.stats.map((stat) => {
          const [{ reduction }] = constants.REDUCTION_TITLES.filter(
            (title) => title?.title === stat?.stat.name
          );
          return (
            <div className='pokemon-stats-value' key={stat.stat.name}>
              <p className={`pokemon-stats-name color-${color || 'default'}`}>
                {reduction.toUpperCase()}
              </p>
              <p>{stat.base_stat}</p>
              <div className='pokemon-stats-progress'>
                <Progress
                  size='sm'
                  max={280}
                  value={stat.base_stat}
                  css={{
                    $$progressColor: `${setColor(color)}`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

