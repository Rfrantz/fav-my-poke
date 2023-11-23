import { Details } from '../containers/Details';
import { Favorites } from '../containers/Favorites';
import { Home } from '../containers/Home';

export const PUBLIC_ROUTES = [
  {
    publicRoute: true,
    path: '/details',
    component: Details,
    title: `Details Pokémon`,
  },
  {
    publicRoute: true,
    path: '/favorites',
    component: Favorites,
    title: 'Favorited Pokémons',
  },
  {
    publicRoute: true,
    path: '/home',
    component: Home,
    title: 'List of all Pokémons',
  },
];
