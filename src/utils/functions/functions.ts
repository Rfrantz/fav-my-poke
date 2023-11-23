import { PokemonDetails } from '../../containers/Details/useDetails';
import { STORAGE_KEYS } from '../constants/local-storage-keys';

// Function to save a Pokemon object in local storage favorites
export const savePokemonOnFavorites = (pokemon: PokemonDetails) => {
  const existingArray = JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES) ?? '[]');

  existingArray.push(pokemon);

  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(existingArray));
};

// Function to remove a Pokemon object from local storage favorites
export const removePokemonFromFavorites = (pokemonToRemove: PokemonDetails) => {
  const existingArray = JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES) ?? '[]');

  const index = existingArray.findIndex(
    (pokemon: PokemonDetails) => pokemon.id === pokemonToRemove.id,
  );

  if (index !== -1) {
    existingArray.splice(index, 1);

    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(existingArray));
  }
};

export const findPokemonInFavorites = (pokemonToFindName: string) => {
  // Retrieve the existing array of objects from local storage or initialize an empty array if it doesn't exist
  const existingArray = JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES) ?? '[]');

  const foundPokemon = existingArray.find(
    (pokemon: PokemonDetails) => pokemon.name === pokemonToFindName,
  );

  if (foundPokemon) {
    return foundPokemon;
  }

  return false;
};
