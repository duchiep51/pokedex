import axios from "axios";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "../apis/fetcher";
import { GET_POKE_URL } from "../constants";
import { Poke } from "../types";

const useAllPokemon = () => {
  const { data, isLoading } = useSWRImmutable(
    `${GET_POKE_URL}?limit=1200`,
    fetcher
  );

  const allPokes = (data?.data.results ?? []) as Poke[];

  return {
    isLoading,
    allPokes,
  };
};

export default useAllPokemon;
