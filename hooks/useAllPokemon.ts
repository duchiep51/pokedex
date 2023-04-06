import axios from "axios";
import useSWR from "swr";

const GET_ALL_POKE_URL = `https://pokeapi.co/api/v2/pokemon/?limit=1200`;
const pokeFetcher = (url: string) => axios.get(url);

export type Poke = {
  name: string,
  url: string
}

const useAllPokemon = () => {
  const { data, isLoading } = useSWR(GET_ALL_POKE_URL, pokeFetcher);

  const allPokes = (data?.data.results ?? []) as Poke[];

  return {
    isLoading,
    allPokes,
  };
};

export default useAllPokemon
