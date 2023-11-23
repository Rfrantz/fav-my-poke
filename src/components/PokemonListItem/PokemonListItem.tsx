import { PokemonImageWrapper, PokemonItemWrap, PokemonNameWrapper } from './pokemon.styles';

type PokemonListItemArgs = {
  name: string;
  imageUrl: string;
  callBack?: () => void;
};

export const PokemonListItem = ({ name, imageUrl, callBack }: PokemonListItemArgs) => (
  <PokemonItemWrap
    className="col-xs-12 col-md-4 d-flex flex-sm-row flex-md-column flex-wrap justify-content-sm-center justify-content-md-between align-items-center mb-3"
    onClick={callBack}
  >
    <PokemonImageWrapper className="p-3">
      <img src={imageUrl} alt={name} />
    </PokemonImageWrapper>
    <PokemonNameWrapper>
      <span className="text-capitalize text-start">{name}</span>
    </PokemonNameWrapper>
  </PokemonItemWrap>
);
