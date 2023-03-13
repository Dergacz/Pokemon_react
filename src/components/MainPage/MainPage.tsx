import React, { FC, useEffect, useMemo, useState } from 'react';

// components
import { Button, Dropdown, Input, Pagination } from '@nextui-org/react';
import { PokemonList } from '../PokemonList/PokemonList';
import { Header } from '../Header/Header';

// types
import { IPokemonPreview, IPokemonTypes } from '../../models/models';
import { Selection } from '@react-types/shared';

// constants
import * as constants from '../../constants/constants';

// hooks
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

// actions
import {
  clearError,
  clearPokemonType,
  fetchPokemon,
  fetchPokemonByType,
  fetchPokemons,
  fetchPokemonTypes,
  setCurrentPage,
} from '../../actions/pokemonAction';
import { clearPokemonSpecies, fetchPokemonSpecies } from '../../actions/pokemonSpeciesAction';
import { fetchSearchPokemon } from '../../actions/searchPokemonAction';

export const MainPage: FC = () => {
  const dispatch = useAppDispatch();
  const {
    pokemons,
    pokemonsArray,
    currentPage,
    pokemonTypes,
    pokemonCurrentType,
  } = useAppSelector((state) => state.pokemonReducer);
  const { appAgent } = useAppSelector(state => state.appAgentReducer);

  const pokemonCountOnPage = appAgent === constants.MOBILE ? 10 : 9;

  const [searchPokemon, setSearchPokemon] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [filteredPokemons, setFilteredPokemons] = useState<IPokemonTypes[]>([]);
  const [currentFilteredTypePokemons, setCurrentFilteredTypePokemons] = useState<IPokemonTypes[]>([]);
  const [stateCurrentPage, setStateCurrentPage] = useState<number>(0);

  useEffect(() => {
    if (pokemonCurrentType?.name) {
      setSelectedType(pokemonCurrentType.name);
    } else {
      setSelectedType(constants.FILTER_BY_TYPE);
    }
  }, [pokemonCurrentType?.name]);

  useEffect(() => {
    setStateCurrentPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (!pokemonsArray.length && appAgent) {
      dispatch(clearPokemonSpecies());
      dispatch(fetchPokemonTypes());
      dispatch(fetchPokemons(stateCurrentPage, pokemonCountOnPage));
    }
  }, [appAgent]);

  useEffect(() => {
    setFilteredPokemons(pokemonCurrentType?.pokemon);
  }, [pokemonCurrentType?.name, stateCurrentPage]);

  useEffect(() => {
    setCurrentFilteredTypePokemons(pokemonCurrentType?.pokemon?.slice(stateCurrentPage * pokemonCountOnPage, stateCurrentPage * pokemonCountOnPage + pokemonCountOnPage));
  }, [filteredPokemons, stateCurrentPage]);

  useEffect(() => {
    if (currentFilteredTypePokemons?.length && !pokemonsArray.length) {
      const currentFilteredPokemons: IPokemonPreview[] = [];
      currentFilteredTypePokemons.map(item => {
        currentFilteredPokemons.push(item.pokemon);
        dispatch(fetchPokemonSpecies(item.pokemon.name));
      });
      dispatch(fetchPokemon(currentFilteredPokemons));
    }
  }, [currentFilteredTypePokemons]);

  useEffect(() => {
    if (pokemons && !pokemonsArray.length && !currentFilteredTypePokemons?.length) {
      pokemons.results.map(pokemon => {
        dispatch(fetchPokemonSpecies(pokemon.name));
      });
      dispatch(fetchPokemon(pokemons.results));
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
    setStateCurrentPage(page);
    dispatch(setCurrentPage(page));
    dispatch(clearPokemonSpecies());
    dispatch(fetchPokemons(page, pokemonCountOnPage));
  };

  const setSelectedTypeHandler = (keys: any) => {
    dispatch(fetchPokemonByType(keys.currentKey));
    setSelectedType(keys.currentKey);
  };

  const clearSelectedTypeHandler = () => {
    dispatch(clearPokemonType());
    dispatch(fetchPokemons(0, pokemonCountOnPage));
    setSelectedType(constants.FILTER_BY_TYPE);
  };

  return (
    <>
      <Header setFirstPageHandler={currentPage !== 0 ? clearSelectedTypeHandler : undefined} />
      <Input
        className='main-page-search'
        aria-label='input'
        width='100%'
        bordered
        placeholder='Search pokemon'
        onChange={(e) => setSearchPokemon(e.target.value)}
      />
      <div className='main-page-buttons'>
        <Dropdown>
          <Dropdown.Button
            flat
            color='primary'
            css={{ tt: 'capitalize' }}
          >
            {selectedType}
          </Dropdown.Button>
          <Dropdown.Menu
            aria-label='Single selection actions'
            color='primary'
            disallowEmptySelection
            selectionMode='single'
            selectedKeys={selectedType}
            onSelectionChange={(keys: Selection) => setSelectedTypeHandler(keys)}
          >
            {useMemo(() => pokemonTypes?.map((type) => {
              return <Dropdown.Item css={{ tt: 'capitalize' }} key={type.name}>{type.name}</Dropdown.Item>;
            }), [pokemonTypes])}
          </Dropdown.Menu>
        </Dropdown>
        <Button
          color='primary'
          auto
          disabled={!pokemonCurrentType?.name}
          onPress={clearSelectedTypeHandler}
          aria-label='clear filters'
        >
          Clear Filters
        </Button>
      </div>
      <PokemonList searchPokemon={searchPokemon}/>
      <footer className='main-page-pagination'>
        {!searchPokemon && (
          <Pagination
            aria-label='pagination'
            size={`${appAgent === constants.MOBILE ? 'sm' : 'md'}`}
            total={Math.ceil(filteredPokemons ? filteredPokemons.length / pokemonCountOnPage : count / pokemonCountOnPage)}
            initialPage={stateCurrentPage + 1}
            page={stateCurrentPage + 1}
            onChange={(page) => changePokemonsPageHandler(page - 1)}
          />
        )}
      </footer>
    </>
  );
};
