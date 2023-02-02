import React, { FC, useEffect, useState } from 'react';

// components
import { Input, Pagination } from '@nextui-org/react';
import { PokemonList } from '../PokemonList/PokemonList';
import { Header } from '../Header/Header';

// hooks
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

// actions
import {
  clearPokemonsArray,
  fetchPokemon,
  fetchPokemons,
  fetchPokemonSpecies,
  fetchSearchPokemon,
} from '../../reducers/actionCreaters';

export const MainPage: FC = () => {
  const dispatch = useAppDispatch();
  const { pokemons, pokemonsArray } = useAppSelector(
    (state) => state.pokemonReducer
  );

  const [searchPokemon, setSearchPokemon] = useState<string>('');

  useEffect(() => {
    if (!searchPokemon) {
      dispatch(fetchPokemons());
    }
  }, [fetchPokemons, searchPokemon]);

  useEffect(() => {
    if (pokemons && pokemonsArray.length === 0) {
      pokemons.results.map((pokemon) => {
        dispatch(fetchPokemon(pokemon.name));
        dispatch(fetchPokemonSpecies(pokemon.name));
      });
    }
  }, [pokemons, !searchPokemon]);

  useEffect(() => {
    if (searchPokemon.trim()) {
      const getData = setTimeout(() => {
        dispatch(fetchSearchPokemon(searchPokemon.toLowerCase().trim()));
      }, 700);
      return () => clearTimeout(getData);
    } else {
      dispatch(clearPokemonsArray());
    }
  }, [searchPokemon]);

  const count = pokemons?.count;
  const changePokemonsPageHandler = (page: number) => {
    dispatch(fetchPokemons(page));
  };

  return (
    <>
      <Header />
      <Input
        className='main-page-search'
        width='100%'
        bordered
        placeholder='Search pokemon'
        onChange={(e) => setSearchPokemon(e.target.value)}
      />
      <PokemonList />
      <footer className='main-page-pagination'>
        {!searchPokemon && (
          <Pagination
            total={Math.ceil(count / 9)}
            initialPage={1}
            onChange={(page) => changePokemonsPageHandler(page - 1)}
          />
        )}
      </footer>
    </>
  );
};
