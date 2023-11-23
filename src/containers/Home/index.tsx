import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PokemonsPagination } from '../../components/Pagination/Pagination';
import { PokemonListItem } from '../../components/PokemonListItem/PokemonListItem';
import { PokemonItemResult, usePokeApi } from '../../hooks/usePokeApi';
import { STORAGE_KEYS } from '../../utils/constants/local-storage-keys';

import { HomeWrapper } from './home.styles';

// Create a functional component 'Home'
export const Home = () => {
  // Restore the value of 'currentPage' from local storage, if available.
  // Otherwise, set it to 1.
  const restoredCurrentPage = parseInt(localStorage.getItem(STORAGE_KEYS.CURRENT_PAGE) ?? '1');
  const { pokemonsList, pokemonsCount, isFetchingPokemons, getPokemons } = usePokeApi();
  const [currentPage, setCurrentPage] = useState<number>(restoredCurrentPage);
  const navigateTo = useNavigate();

  // Fetch pokemons when the component mounts
  useEffect(() => {
    !isFetchingPokemons && getPokemons(currentPage, 20);
  }, []);

  // Callback function to switch between pages
  const switchPage = useCallback((page: number) => {
    setCurrentPage(page);
    getPokemons(page, 20);

    // Then scroll to the top of the page
    window.scrollTo(0, 0);

    // Store the current page in local storage to maintain the state across the user navigation
    localStorage.setItem(STORAGE_KEYS.CURRENT_PAGE, page.toString());
  }, []);

  // Render the component
  return (
    <HomeWrapper className="container-fluid d-flex justify-content-center align-items-center flex-wrap">
      {/* Map through the pokemonsList array and render a PokemonListItem for each pokemon */}
      {pokemonsList?.map((pokemon: PokemonItemResult) => (
        <PokemonListItem
          key={pokemon.name}
          callBack={() => navigateTo('/details', { state: pokemon })}
          imageUrl={pokemon.imageUrl}
          name={pokemon.name}
        />
      ))}

      {/* Render the PokemonsPagination component with pagination options */}
      <PokemonsPagination
        count={pokemonsCount}
        currentPage={currentPage}
        limit={20}
        goPage={switchPage}
      />
    </HomeWrapper>
  );
};
