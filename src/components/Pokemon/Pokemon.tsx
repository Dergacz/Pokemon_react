import React, { FC, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import weightLogo from '../../../public/images/weight.png';
import heightLogo from '../../../public/images/height.png';
import arrowLogo from '../../../public/images/arrow.png';
import defaultPokemon from '../../../public/images/pokemon-default.png';

const Pokemon: FC = () => {
  const { pokemonsArray, pokemonsSpecies } = useAppSelector((state) => state.pokemonReducer);
  const { title } = useParams();
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  const pokemonSpecies = useMemo(() => pokemonsSpecies.find((p) => p.name === title), [title]);
  const pokemon = useMemo(() => pokemonsArray.find((p) => p.name === title), [title]);

  return (
    <div className={`pokemon-container background-${pokemonSpecies?.color.name || 'default'}`}>
      <div className='pokemon-header'>
        <div>
          <img
            className='pokemon-arrow'
            src={arrowLogo}
            alt='back-arrow'
            width={16}
            height={16}
            onClick={goBack}
          />
          <span className='pokemon-name'>{title}</span>
        </div>
        <span className='pokemon-id'>
          #{String(pokemon.id).padStart(3, '0')}
        </span>
      </div>
      <img
        className='pokemon-img'
        src={pokemon.sprites.front_default || defaultPokemon}
        alt='pokemon'
      />
      <div className={`pokemon-stats border-${pokemonSpecies?.color.name || 'default'}`}>
        <div className='pokemon-spell-wrapper'>
          {pokemon.types.map((type) => {
            return (
              <div
                key={type.type.name}
                className={`pokemon-spell background-${pokemonSpecies?.color.name || 'default'}`}
              >
                <span className='pokemon-spell-name'>{type.type.name}</span>
              </div>
            );
          })}
        </div>
        <h3 className={`pokemon-about-title color-${pokemonSpecies?.color.name || 'default'}`}>
          About
        </h3>
        <div className='pokemon-about-wrapper'>
          <div className='pokemon-about-argument'>
            <div className='pokemon-about-description'>
              <img src={weightLogo} alt="weight"/>
              <p className='pokemon-about-weight'>{pokemon.weight / 10} kg</p>
            </div>
            <p className='pokemon-about-subtitle'>Weight</p>
          </div>
          <div className='pokemon-about-argument'>
            <div className='pokemon-about-description'>
              <img src={heightLogo} alt="height"/>
              <p className='pokemon-about-height'>{pokemon.height / 10} m</p>
            </div>
            <p className='pokemon-about-subtitle'>Height</p>
          </div>
          <div className='pokemon-about-argument'>
            {pokemon.abilities.map((ability) => {
              return <p className='pokemon-about-ability'>{ability.ability.name}</p>;
            })}
            <p className='pokemon-about-subtitle'>Movies</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
