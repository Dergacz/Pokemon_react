import { Dispatch } from '@reduxjs/toolkit';
import { IEvolvesTo } from '../models/models';
import * as API from '../api/api';
import { pokemonEvolutionSlice } from '../reducers/pokemonEvolutionSlice';

export const fetchPokemonEvolutionChainAction = (url: string = '') => async (dispatch: Dispatch) => {
  try {
    dispatch(pokemonEvolutionSlice.actions.fetchPokemonEvolutionChainPending());
    const evolutionPokemon = [];
    const pokemonSpecies = [];
    if (url) {
      const evolutionChain = await API.fetchPokemonEvolutionChainAPI(url);
      const handleNameSpecies = (evolves: IEvolvesTo) => {
        const {
          species,
          evolves_to: evolvesTo,
          evolution_details: evolutionDetails,
        } = evolves;
        let namesPokemons = [
          {
            name: species.name,
            level: 0,
            trigger: evolutionDetails[0]?.trigger?.name,
            held_item: evolutionDetails[0]?.held_item?.name,
          },
        ];
        if (evolutionDetails.length) {
          namesPokemons[0].level = evolutionDetails[0].min_level;
        }
        evolvesTo.forEach((evolve: IEvolvesTo) => {
          namesPokemons = namesPokemons.concat(handleNameSpecies(evolve));
        });
        return namesPokemons;
      };
      const pokemons = handleNameSpecies(evolutionChain.data.chain);
      for (let i = 0; i < pokemons.length; i++) {
        const pokemon = await API.fetchPokemonAPI(pokemons[i].name);
        const species = await API.fetchPokemonSpeciesAPI(pokemons[i].name);
        evolutionPokemon.push(pokemon.data);
        pokemonSpecies.push(species.data);
      }
    }
    dispatch(pokemonEvolutionSlice.actions.fetchPokemonEvolutionChainSpeciesSuccess(pokemonSpecies));
    if (evolutionPokemon.length > 1) {
      dispatch(pokemonEvolutionSlice.actions.fetchPokemonEvolutionChainSuccess(evolutionPokemon));
    } else {
      dispatch(pokemonEvolutionSlice.actions.fetchPokemonEvolutionChainSuccess([]));
    }
  } catch (e) {
    dispatch(pokemonEvolutionSlice.actions.fetchPokemonEvolutionChainError(e.message));
  }
};
