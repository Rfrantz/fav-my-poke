import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { PokemonItemResult, usePokeApi } from '../../hooks/usePokeApi';
import { POKEAPI_ENDPOINTS, POKEAPI_HOST } from '../../utils/constants/pokeapi';

import { DetailsWrapper, InfoWrapper, PokemonImageWrapper, TextWrapper } from './details.styles';

// Define types for abilities and ability items
type Ability = {
  name: string;
  url: string;
};

type AbilityItem = {
  ability: Ability;
  is_hidden: boolean;
  slot: number;
};

type Stat = {
  name: string;
  url: string;
};

type StatItem = {
  base_stat: number;
  effort: number;
  stat: Stat;
};

type PokemonDetails = {
  id: number;
  abilities: AbilityItem[];
  stats: StatItem[];
  weight: number;
  height: number;
  charactheriscs: string;
};

export const Details = () => {
  // Get the state from the location hook provided by react-router-dom
  const { state } = useLocation();

  // Destructure the required properties from the state object
  const { url, imageUrl, name }: PokemonItemResult = state;

  // Use custom hook to fetch the pokemon details
  const { getPokemon } = usePokeApi();

  // State to store the fetched pokemon details
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails>();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  // Fetch the pokemon details once when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);

      try {
        const pokemonDetails: PokemonDetails = await getPokemon(url);
        setPokemonDetails(pokemonDetails);

        const id = pokemonDetails.id;
        const response = await getPokemon(
          `${POKEAPI_HOST}${POKEAPI_ENDPOINTS.CHARACTERISTIC}${id}`,
        );

        if (!response?.descriptions) return;

        const responseDetailsFound = response.descriptions.find(
          (description: any) => description.language.name === 'en',
        );

        const newPokemonDetails = {
          ...pokemonDetails,
          charactheriscs: responseDetailsFound.description,
        } as PokemonDetails;

        setPokemonDetails(newPokemonDetails);
      } catch (error) {
        console.error('Erro at Pokemon Details', error);
      } finally {
        setIsFetching(false);
      }
    };

    !isFetching && fetchData();
  }, []);

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
          {/* Render the weight of the Pokemon */}
          <span className="fs-6">Weight: {pokemonDetails?.weight}</span>
        </TextWrapper>
        <TextWrapper>
          {/* Render the height of the Pokemon */}
          <span className="fs-6">Height: {pokemonDetails?.height}</span>
        </TextWrapper>
      </InfoWrapper>
    </DetailsWrapper>
  );
};
