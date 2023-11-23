import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

import { PokemonItemResult } from '../../hooks/usePokeApi';

import { DetailsWrapper, InfoWrapper, PokemonImageWrapper, TextWrapper } from './details.styles';
import { AbilityItem, StatItem, useDetails } from './useDetails';

export const Details = () => {
  // Get the state from the location hook provided by react-router-dom
  const { state } = useLocation();

  // Destructure the required properties from the state object
  const { url, imageUrl, name }: PokemonItemResult = state;

  // Call the useDetails custom hook to fetch the details of the pokemon using the provided URL
  const { pokemonDetails, isFavorite, handleSaveFavoriteAction, handleRemoveFavoriteAction } =
    useDetails(url, imageUrl, name);

  return (
    <DetailsWrapper className="container-fluid d-flex justify-content-center align-content-start align-items-center flex-wrap">
      <PokemonImageWrapper className="p-3">
        <img src={imageUrl} alt={name} />
      </PokemonImageWrapper>
      <InfoWrapper className="details-info-wrapper">
        <TextWrapper className="text-center">
          <h3 className="my-3">
            More info about <span className="text-capitalize">{name}</span>
          </h3>
        </TextWrapper>

        {pokemonDetails?.charactheriscs ? (
          <TextWrapper className="mb-4">
            <h4>Charactheriscs</h4>
            <span className="fs-5">&nbsp;&nbsp;{pokemonDetails?.charactheriscs}</span>
          </TextWrapper>
        ) : null}

        {/* Abilities */}
        <TextWrapper>
          <h4>Abilities</h4>
        </TextWrapper>

        {/* Render the abilities as a list */}
        <ul className="w-100">
          {/* Check if pokemonDetails is null or undefined */}
          {!pokemonDetails
            ? null
            : // Map over the abilities and render each ability name
              (pokemonDetails?.abilities ?? []).map(({ ability }: AbilityItem) => (
                <li className="text-capitalize">{ability.name.replace('-', ' ')}</li>
              ))}
        </ul>

        <TextWrapper>
          <h4>Skills</h4>
        </TextWrapper>
        <ul className="w-100">
          {/* Check if pokemonDetails is null or undefined */}
          {!pokemonDetails?.stats
            ? null
            : // Sort the stats by base_stat in descending order and map over them to render each stat item
              pokemonDetails.stats
                .sort((a, b) => b.base_stat - a.base_stat)
                .map(({ base_stat, stat }: StatItem) => (
                  <li className="text-capitalize">
                    {/* Render skill's score and the skill name */}
                    <span>{base_stat} </span>
                    <span className="text-capitalize">{stat.name.replace('-', ' ')}</span>
                  </li>
                ))}
        </ul>
        <TextWrapper>
          {/* Weight */}
          <span className="fs-6">Weight: {pokemonDetails?.weight}</span>
        </TextWrapper>
        <TextWrapper>
          {/* Height */}
          <span className="fs-6">Height: {pokemonDetails?.height}</span>
        </TextWrapper>

        {/* Buttons to add/remove a favorited pokémon */}
        <div className="d-grid gap-2 mt-5">
          {!isFavorite ? (
            <Button
              onClick={() => (pokemonDetails ? handleSaveFavoriteAction(pokemonDetails) : null)}
              className="w-100 fs-5 fw-bold"
              variant="success"
            >
              Add to favorites
            </Button>
          ) : (
            <Button
              onClick={() => (pokemonDetails ? handleRemoveFavoriteAction(pokemonDetails) : null)}
              className="w-100 fs-5 fw-bold"
              variant="danger"
            >
              Remove from favorites
            </Button>
          )}
        </div>
      </InfoWrapper>
    </DetailsWrapper>
  );
};
