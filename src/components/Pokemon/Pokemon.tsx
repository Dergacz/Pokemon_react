import React, { FC, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// components
import { PokemonStats } from '../PokemonStats/PokemonStats';
import { PokemonEvolutions } from '../PokemonEvolutions/PokemonEvolutions';

// hooks
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

// actions

// images
import arrowChange from '../../../public/images/arrow_right.png';
import arrowLogo from '../../../public/images/arrow.png';
import defaultPokemon from '../../../public/images/pokemon-default.png';
import { fetchPokemonEvolutionChainAction } from '../../actions/pokemonEvolutionAction';

export const Pokemon: FC = () => {
  const dispatch = useAppDispatch();
  const { pokemonsArray } = useAppSelector((state) => state.pokemonReducer);
  const { pokemonsSpecies } = useAppSelector((state) => state.pokemonSpeciesReducer);
  const { pokemonEvolutionChain } = useAppSelector((state) => state.pokemonEvolutionReducer);
  const { searchedPokemon } = useAppSelector((state) => state.searchPokemonReducer);
  const { title } = useParams();

  const pokemonSpecies = useMemo(
    () => pokemonsSpecies?.find((p) => p.name === title),
    [title],
  );

  const pokemonFromArray = useMemo(
    () => pokemonsArray?.find((p) => p.name === title),
    [title],
  );

  const pokemonFromEvolutionChain = useMemo(
    () => pokemonEvolutionChain?.find((p) => p.name === title),
    [title],
  );

  const pokemon = pokemonFromArray || pokemonFromEvolutionChain || searchedPokemon;

  const { front_shiny: frontShiny = '', front_default: frontDefault } =
    pokemon.sprites?.other?.['official-artwork'];

  const [color, setColor] = useState<string>(pokemonSpecies?.color.name);
  const [isPokemonStats, setIsPokemonStats] = useState<boolean>(true);
  const [isShinyColor, setIsShinyColor] = useState<boolean>(false);

  useEffect(() => {
    if (color) {
      setColor(pokemonSpecies?.color.name);
    }
  }, [pokemonSpecies?.color.name]);

  useEffect(() => {
    dispatch(fetchPokemonEvolutionChainAction(pokemonSpecies?.evolution_chain.url));
  }, []);

  const onChangePokemonDescription = () => {
    setIsPokemonStats(!isPokemonStats);
  };

  const setPokemonImage = () => {
    if (!frontShiny && !frontDefault) {
      return defaultPokemon;
    }
    if (isShinyColor) {
      return frontShiny;
    }
    return frontDefault;
  };

  return (
    <div className='pokemon-wrapper'>
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
          className={`pokemon-img ${frontShiny && 'pokemon-pointer'}`}
          src={setPokemonImage()}
          alt='pokemon'
          onClick={() => setIsShinyColor(frontShiny && !isShinyColor)}
        />
        {!!pokemonEvolutionChain.length && (
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
          <PokemonStats pokemon={pokemon} pokemonSpecies={pokemonSpecies} color={color} />
        ) : (
          <PokemonEvolutions
            pokemonEvolutionChain={pokemonEvolutionChain}
            color={color}
          />
        )}
      </div>
    </div>
  );
};
