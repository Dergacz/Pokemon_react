import React, { FC, useEffect, useMemo, useState } from 'react';

// components
import { Dropdown, Input, Pagination } from '@nextui-org/react';
import { PokemonList } from '../PokemonList/PokemonList';
import { Header } from '../Header/Header';

// hooks
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

// actions
import {
  clearError,
  fetchPokemon,
  fetchPokemons,
  fetchPokemonSpecies,
  fetchPokemonType,
  fetchPokemonTypes,
  fetchSearchPokemon,
  setCurrentPage,
} from '../../actions/actionCreaters';

export const MainPage: FC = () => {
  const dispatch = useAppDispatch();
  const { pokemons, pokemonsArray, currentPage, pokemonTypes } = useAppSelector(
    (state) => state.pokemonReducer
  );

  const [searchPokemon, setSearchPokemon] = useState<string>('');
  const [selectedType, setSelectedType] = useState<any>('');

  useEffect(() => {
    if (pokemonsArray.length < 9) {
      dispatch(fetchPokemonTypes());
      dispatch(fetchPokemons(currentPage));
    }
  }, []);

  useEffect(() => {
    if (pokemons && !pokemonsArray.length) {
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
      dispatch(clearError());
    }
  }, [searchPokemon]);

  const count = pokemons?.count;
  const changePokemonsPageHandler = (page: number) => {
    dispatch(setCurrentPage(page));
    dispatch(fetchPokemons(page));
  };

  const setSelectedTypeHandler = (keys: any) => {
    dispatch(fetchPokemonType(keys.currentKey));
    setSelectedType(keys.currentKey);
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
      <Dropdown>
        <Dropdown.Button
          flat
          color='primary'
          css={{ tt: 'uppercase', margin: '10px auto 0 auto' }}
        >
          Filter by type
        </Dropdown.Button>
        <Dropdown.Menu
          aria-label='Single selection actions'
          color='primary'
          disallowEmptySelection
          selectionMode='single'
          selectedKeys={selectedType}
          onSelectionChange={(keys: any) => setSelectedTypeHandler(keys)}
        >
          {useMemo(() => pokemonTypes?.map((type) => {
            return <Dropdown.Item key={type.name}>{type.name}</Dropdown.Item>;
          }), [pokemonTypes])}
        </Dropdown.Menu>
      </Dropdown>
      <PokemonList />
      <footer className='main-page-pagination'>
        {!searchPokemon && (
          <Pagination
            total={Math.ceil(count / 9)}
            initialPage={currentPage + 1}
            onChange={(page) => changePokemonsPageHandler(page - 1)}
          />
        )}
      </footer>
    </>
  );
};
