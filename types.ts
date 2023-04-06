export type Poke = {
  name: string;
  url: string;
};

export type PokeDetail = {
  name: string;
  image: string;
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
