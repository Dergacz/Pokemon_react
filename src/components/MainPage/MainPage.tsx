import React, { FC, useEffect } from 'react';
import { PokemonList } from '../PokemonList/PokemonList';
import { Input, Pagination } from '@nextui-org/react';
import { Header } from '../Header/Header';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  fetchPokemon,
  fetchPokemons,
  fetchPokemonSpecies,
} from '../../reducers/actionCreaters';

export const MainPage: FC = () => {
  const dispatch = useAppDispatch();
  const { pokemons, pokemonsArray } = useAppSelector(
    (state) => state.pokemonReducer
  );

  useEffect(() => {
    dispatch(fetchPokemons());
  }, []);

  useEffect(() => {
    if (pokemons && pokemonsArray.length < 9) {
      pokemons.results.map((pokemon) => {
        dispatch(fetchPokemon(pokemon.name));
        dispatch(fetchPokemonSpecies(pokemon.name));
      });
    }
  }, [pokemons]);

  const count = pokemons?.count;
  const nextPokemonsHandler = (page: number) => {
    dispatch(fetchPokemons(page));
  };

  return (
    <>
      <Header />
      <Input
        className='main-page-search'
        width='100%'
        bordered
        placeholder='search pokemon'
      />
      <PokemonList />
      <footer className='main-page-pagination'>
        <Pagination
          total={Math.ceil(count / 9)}
          initialPage={1}
          onChange={(page) => nextPokemonsHandler(page - 1)}
        />
      </footer>
    </>
  );
};
