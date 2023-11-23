import { useNavigate } from 'react-router-dom';

import { PokemonListItem } from '../../components/PokemonListItem/PokemonListItem';
import { STORAGE_KEYS } from '../../utils/constants/local-storage-keys';
import { PokemonDetails } from '../Details/useDetails';

import { FavoritesWrapper } from './favorites.styles';

export const Favorites = () => {
  const navigateTo = useNavigate();
  const favoritedPokemons = JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES) ?? '[]');
  return (
    <FavoritesWrapper className="container-fluid d-flex justify-content-small-center justify-content-md-start align-content-start align-items-center flex-wrap">
      {favoritedPokemons?.map((pokemon: PokemonDetails) => (
        <PokemonListItem
          callBack={() => navigateTo('/details', { state: pokemon })}
          imageUrl={pokemon.imageUrl}
          name={pokemon.name}
        />
      ))}
    </FavoritesWrapper>
  );
};
