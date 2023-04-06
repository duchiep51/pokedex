import axios from "axios";
import { useMemo } from "react";
import useSWRImmutable from "swr/immutable";
import { Poke } from "./useAllPokemon";

const TYPE_URL = `https://pokeapi.co/api/v2/type/`;
const typesFetcher = (url: string) => axios.get(url);
const typeDetailsFetcher = ([url, types]: (string | string[])[]) => {
  const requests = (types as string[]).map((type) =>
    axios.get(`${url}${type}`)
  );
  return Promise.all(requests);
};

export type PokeType = {
  name: string;
  url: string;
};

export type PokeTypeDetail = {
  id: number;
  name: string;
  pokemons: Poke[];
};

const usePokeType = () => {
  const { data: typesRes, isLoading: typesIsLoading } = useSWRImmutable(
    TYPE_URL,
    typesFetcher
  );

  const types = useMemo(
    () => (typesRes?.data.results ?? []) as PokeType[],
    [typesRes]
  );

  const { data: typeDetailsRes } = useSWRImmutable(
    types.length ? [TYPE_URL, types.map((type) => type.name)] : null,
    typeDetailsFetcher
  );

  const typeDetails = useMemo(
    () =>
      typeDetailsRes
        ?.map((type) => type.data)
        .map((type) => ({
          id: type.id,
          name: type.name,
          pokemons: [
            ...type.pokemon.map((poke) => ({ ...poke.pokemon })),
          ] as Poke[],
        })) ?? [],
    [typeDetailsRes]
  ) as PokeTypeDetail[];

  const getPokesByType = (typeName: string) =>
    typeDetails.find((type) => type.name === typeName).pokemons;

  const getPokesByTypes = (types: string[]): Poke[] => {
    if (types.length === 1) {
      const pokesByType = getPokesByType(types[0]);
      return pokesByType;
    }
    if (types.length === 2) {
      const pokesOfType1 = getPokesByType(types[0]);
      const pokesOfType2 = getPokesByType(types[1]);
      const pokesByIn2Type = pokesOfType1?.filter((poke) =>
        pokesOfType2.some((poke2) => poke.name === poke2.name)
      );
      return pokesByIn2Type;
    }
    return [];
  };

  return {
    types: types ?? [],
    typesIsLoading,
    typeDetails: typeDetails ?? [],
    getPokesByTypes,
  };
};

export default usePokeType;
