import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PokemonsPagination } from '../../components/Pagination/Pagination';
import { PokemonListItem } from '../../components/PokemonListItem/PokemonListItem';
import { PokemonItemResult, usePokeApi } from '../../hooks/usePokeApi';
import { STORAGE_KEYS } from '../../utils/constants/local-storage-keys';

import { HomeWrapper } from './home.styles';

export const Home = () => {
  const restoredCurrentPage = parseInt(localStorage.getItem(STORAGE_KEYS.CURRENT_PAGE) ?? '1');
  const { pokemonsList, pokemonsCount, isFetchingPokemons, getPokemons } = usePokeApi();

  const [currentPage, setCurrentPage] = useState<number>(restoredCurrentPage);
  const navigateTo = useNavigate();

  useEffect(() => {
    !isFetchingPokemons && getPokemons(currentPage, 20);
  }, []);

  const switchPage = useCallback((page: number) => {
    setCurrentPage(page);
    getPokemons(page, 20);
    window.scrollTo(0, 0);
    localStorage.setItem(STORAGE_KEYS.CURRENT_PAGE, page.toString());
  }, []);

  return (
    <HomeWrapper className="container-fluid d-flex justify-content-center align-items-center flex-wrap">
      {pokemonsList?.map((pokemon: PokemonItemResult) => (
        <PokemonListItem
          key={pokemon.name}
          callBack={() => navigateTo('/details', { state: pokemon })}
          imageUrl={pokemon.imageUrl}
          name={pokemon.name}
        />
      ))}
      <PokemonsPagination
        count={pokemonsCount}
        currentPage={currentPage}
        limit={20}
        goPage={switchPage}
      />
    </HomeWrapper>
  );
};
