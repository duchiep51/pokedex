import { GET_POKE_URL } from "./../constants";
import { useState } from "react";
import useSWRImmutable from "swr/immutable";
import { multipleFetcher } from "../apis/fetcher";
import { POKE_LIMIT } from "../constants";
import { Poke, PokeDetail } from "../types";
import useAllPokemon from "./useAllPokemon";
import usePokeType from "./usePokeType";

const getPokesByPage = (pokes: Poke[], page: number) =>
  pokes?.slice(page * POKE_LIMIT, (page + 1) * POKE_LIMIT);

const useType = () => {
  const { allPokes } = useAllPokemon();
  const { types, typesIsLoading, getPokesByTypes } = usePokeType();

  const [pagination, setPagination] = useState<number>(0);
  const [pickedTypes, setPickedTypes] = useState<string[]>([]);

  const getNext = () => setPagination(pagination + 1);
  const getPrevious = () => setPagination(pagination - 1);
  const addType = (type: string) => {
    setPickedTypes([...pickedTypes, type]);
    setPagination(0);
  };
  const removeType = (type: string) => {
    pickedTypes.splice(pickedTypes.indexOf(type), 1);
    setPickedTypes([...pickedTypes]);
    setPagination(0);
  };

  const displayedPokes = ((): { pokes: Poke[]; total: number } => {
    const pokes = pickedTypes.length ? getPokesByTypes(pickedTypes) : allPokes;

    const paginatedPokes = getPokesByPage(pokes, pagination);

    return {
      pokes: paginatedPokes,
      total: pokes.length,
    };
  })();

  const totalPage = Math.ceil(displayedPokes.total / POKE_LIMIT);

  const { data: pokesDetailsRes, isLoading: pokeDetailsIsLoading } =
    useSWRImmutable(
      displayedPokes.pokes.length > 0
        ? [GET_POKE_URL, displayedPokes.pokes.map((poke) => poke.name)]
        : null,
      multipleFetcher
    );

  const pokeDetails = pokesDetailsRes
    ?.map((res) => res.data)
    .map((detail) => ({
      name: detail.name,
      image: detail.sprites.other["official-artwork"].front_default,
    })) as PokeDetail[];

  return {
    pokes: pokeDetails ?? [],
    total: displayedPokes.total ?? 0,
    pokeDetailsIsLoading,
    getNext,
    getPrevious,
    currentPage: pagination,
    totalPage,
    types,
    typesIsLoading,
    pickedTypes,
    addType,
    removeType,
  };
};

export default useType;
