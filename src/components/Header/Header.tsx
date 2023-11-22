import { HeaderWrapper } from './header.styles';

type HeaderArgs = {
  page: string;
};

export const Header = ({ page }: HeaderArgs) => (
  <HeaderWrapper>
    <span>Fav My Pokémon {page}</span>
  </HeaderWrapper>
);
