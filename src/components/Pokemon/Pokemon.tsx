import React, {
  FC,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { Link, useParams } from 'react-router-dom';

// components
import { PokemonStats } from '../PokemonStats/PokemonStats';
import { PokemonEvolutions } from '../PokemonEvolutions/PokemonEvolutions';

// hooks
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

// actions
import {
  fetchPokemonEvolutionChain,
  fetchPokemonSpecies,
} from '../../reducers/actionCreaters';

// images
import arrowChange from '../../../public/images/arrow_right.png';
import arrowLogo from '../../../public/images/arrow.png';
import defaultPokemon from '../../../public/images/pokemon-default.png';

export const Pokemon: FC = () => {
  const dispatch = useAppDispatch();
  const { pokemonsArray, pokemonEvolutionChain, pokemonsSpecies } =
    useAppSelector((state) => state.pokemonReducer);
  const { title } = useParams();

  const pokemonSpecies = useMemo(
    () => pokemonsSpecies.find((p) => p.name === title),
    [title]
  );

  const pokemon = useMemo(
    () => pokemonsArray.find((p) => p.name === title),
    [title]
  );

  const [color, setColor] = useState(pokemonSpecies?.color.name);
  const [isPokemonStats, setIsPokemonStats] = useState<boolean>(true);

  useEffect(() => {
    if (color) {
      setColor(pokemonSpecies?.color.name);
    }
  }, [color]);

  useEffect(() => {
    dispatch(fetchPokemonSpecies(title));
    dispatch(fetchPokemonEvolutionChain(title, pokemonSpecies?.evolution_chain.url));
  }, [title]);

  const onChangePokemonDescription = () => {
    setIsPokemonStats(!isPokemonStats);
  };

  return (
    <div className={`pokemon-container background-${color || 'default'}`}>
      <div className='pokemon-header'>
        <div>
          <Link to='/'>
            <img
              className='pokemon-arrow'
              src={arrowLogo}
              alt='back-arrow'
              width={16}
              height={16}
            />
          </Link>
          <span className='pokemon-name'>{pokemon.name}</span>
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
      {pokemonEvolutionChain.length && (
        <div className='pokemon-buttons-wrapper'>
          <img
            className='pokemon-arrow-change'
            src={arrowChange}
            alt='arrow-right'
            onClick={onChangePokemonDescription}
          />
          <img
            className='pokemon-arrow-change'
            src={arrowChange}
            alt='arrow-right'
            onClick={onChangePokemonDescription}
          />
        </div>
      )}
      {isPokemonStats ? (
        <PokemonStats pokemon={pokemon} color={color} />
      ) : (
        <PokemonEvolutions
          pokemonEvolutionChain={pokemonEvolutionChain}
          color={color}
        />
      )}
    </div>
  );
};
