import { useState } from 'react';

import { Header } from './components/Header/Header';
import { PokemonsPagination } from './components/Pagination/Pagination';
import { PokemonListItem } from './components/PokemonListItem/PokemonListItem';
import { usePokeApi } from './hooks/usePokeApi';
import { CustomContainer } from './App.styles';

function App() {
  const { pokemonsList, pokemonsCount, getPokemons } = usePokeApi();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const switchPage = (page: number) => {
    setCurrentPage(page);
    getPokemons((page - 1) * 20, 20);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <Header page="List of Pokemons" />
      <CustomContainer className="container-fluid d-flex justify-content-center align-items-center flex-wrap">
        {pokemonsList?.map((pokemon) => (
          <PokemonListItem
            key={pokemon.name}
            callBack={() => alert('click')}
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
      </CustomContainer>
    </div>
  );
}

export default App;
