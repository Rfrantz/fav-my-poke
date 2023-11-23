import { useCallback, useEffect, useState } from 'react';

import { POKEAPI_ENDPOINTS, POKEAPI_HOST } from '../utils/constants/pokeapi';

export type PokemonItemResult = {
  name: string;
  url: string;
  imageUrl: string;
};

type PokemonList = {
  count: number;
  results: PokemonItemResult[];
};

export const usePokeApi = () => {
  const [pokemonsListNoPhoto, setPokemonsListNoPhoto] = useState<PokemonItemResult[]>();
  const [pokemonsList, setPokemonsList] = useState<PokemonItemResult[]>();
  const [pokemonsCount, setPokemonsCount] = useState<number>(0);
  const [isFetchingPokemonSprite, setIsFetchingPokemonSprite] = useState<boolean>(false);
  const [isFetchingPokemons, setIsFetchingPokemons] = useState<boolean>(false);

  const getPokemonSprite = useCallback(
    (url: string) => {
      setIsFetchingPokemonSprite(true);
      return fetch(url, { headers: {} })
        .then((response) => response.json())
        .then((json) => json.sprites.other.dream_world.front_default)
        .catch((error) => {
          console.error('GetPokemonDetails', error);
        })
        .finally(() => setIsFetchingPokemonSprite(false));
    },
    [pokemonsListNoPhoto],
  );

  const getPokemons = (page: number, limit: number) => {
    const offset = (page - 1) * 20;
    setIsFetchingPokemons(true);
    fetch(`${POKEAPI_HOST}${POKEAPI_ENDPOINTS.POKEMON}?offset=${offset}&limit=${limit}`, {
      headers: {},
    })
      .then((response) => response.json())
      .then((json: PokemonList) => {
        setPokemonsListNoPhoto(json.results);
        setPokemonsCount(json.count);
      })
      .catch((error) => {
        console.error('GetPokemons', error);
      })
      .finally(() => setIsFetchingPokemons(false));
  };

  const getPokemon = (url: string) =>
    fetch(url, {
      headers: {},
    })
      .then((response) => response.json())
      .then((json) => json)
      .catch((error) => {
        console.error('GetPokemon', error);
      });

  useEffect(() => {
    if (!isFetchingPokemonSprite) {
      const updatePokemonsList = async () => {
        const updatedList = pokemonsListNoPhoto ?? [];
        const promises = updatedList.map((pokemon: PokemonItemResult) =>
          getPokemonSprite(pokemon.url).then((imageUrl: string) => {
            const foundPokemon = updatedList.find(({ url }) => pokemon.url === url);
            if (foundPokemon) {
              foundPokemon.imageUrl = imageUrl;
            }
          }),
        );
        await Promise.all(promises);
        setPokemonsList(updatedList);
      };

      updatePokemonsList();
    }
  }, [pokemonsListNoPhoto]);

  return {
    pokemonsList,
    pokemonsCount,
    getPokemon,
    getPokemons,
    isFetchingPokemons,
  };
};
