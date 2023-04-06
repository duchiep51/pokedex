import { useState } from "react";
import useAllPokemon, { Poke } from "./useAllPokemon";
import usePokeType from "./usePokeType";

const POKE_LIMIT = 48;

const getPokesByPage = (pokes: Poke[], page: number) =>
  pokes?.slice(page * POKE_LIMIT, (page + 1) * POKE_LIMIT);

const useType = () => {
  const { allPokes, isLoading: allPokesLoading } = useAllPokemon();
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

  return {
    pokes: displayedPokes.pokes ?? [],
    total: displayedPokes.total ?? 0,
    allPokesLoading,
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
