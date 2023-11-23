import { useCallback, useEffect, useState } from 'react';

import { usePokeApi } from '../../hooks/usePokeApi';
import { POKEAPI_ENDPOINTS, POKEAPI_HOST } from '../../utils/constants/pokeapi';
import {
  findPokemonInFavorites,
  removePokemonFromFavorites,
  savePokemonOnFavorites,
} from '../../utils/functions/functions';

// Define types for abilities and ability items
type Ability = {
  name: string;
  url: string;
};

export type AbilityItem = {
  ability: Ability;
  is_hidden: boolean;
  slot: number;
};

type Stat = {
  name: string;
  url: string;
};

export type StatItem = {
  base_stat: number;
  effort: number;
  stat: Stat;
};

export type PokemonDetails = {
  id: number;
  name: string;
  imageUrl: string;
  abilities: AbilityItem[];
  stats: StatItem[];
  weight: number;
  height: number;
  charactheriscs: string;
};

export const useDetails = (pokemonUrl: string, imageUrl: string, name: string) => {
  // Use custom hook to fetch the pokemon details
  const { getPokemon } = usePokeApi();

  // State to store the fetched pokemon details
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(Boolean(findPokemonInFavorites(name)));

  // Callback function to handle saving a Pokemon as a favorite
  const handleSaveFavoriteAction = useCallback((pokeToFav: PokemonDetails) => {
    savePokemonOnFavorites(pokeToFav);
    setIsFavorite(true);
  }, []);

  // Callback function to handle removing a Pokemon from favorites
  const handleRemoveFavoriteAction = useCallback((pokeToFav: PokemonDetails) => {
    removePokemonFromFavorites(pokeToFav);
    setIsFavorite(false);
  }, []);

  // Fetch the pokemon details once when the component mounts
  useEffect(() => {
    const pokemonInFavoriteCache = findPokemonInFavorites(name);
    if (pokemonInFavoriteCache) {
      setPokemonDetails(pokemonInFavoriteCache);
      return;
    }
    const fetchData = async () => {
      setIsFetching(true);

      try {
        const pokemonDetails: PokemonDetails = await getPokemon(pokemonUrl);
        pokemonDetails.name = name;
        pokemonDetails.imageUrl = imageUrl;
        setPokemonDetails(pokemonDetails);

        const id = pokemonDetails.id;
        const response = await getPokemon(
          `${POKEAPI_HOST}${POKEAPI_ENDPOINTS.CHARACTERISTIC}${id}`,
        );

        if (!response?.descriptions) return;

        const responseDetailsFound = response.descriptions.find(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (description: any) => description.language.name === 'en',
        );

        const newPokemonDetails = {
          ...pokemonDetails,
          charactheriscs: responseDetailsFound.description,
        } as PokemonDetails;

        setPokemonDetails(newPokemonDetails);
      } catch (error) {
        console.error('Erro at Pokemon Details', error);
      } finally {
        setIsFetching(false);
      }
    };

    !isFetching && fetchData();
  }, []);

  return {
    pokemonDetails,
    isFavorite,
    handleSaveFavoriteAction,
    handleRemoveFavoriteAction,
  };
};
