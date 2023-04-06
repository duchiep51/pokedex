import React from "react";
import { Text, View } from "react-native";
import { usePokeContext } from "../../contexts/PokeContext";

const extractNumberFromString = (str: string) =>
  str.match(/\/pokemon\/(\d+)\//)[1];

const getImageURL = (id: any) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

const PokeContainer = () => {
  const {
    pokes,
    total,
    allPokesLoading,
    getNext,
    getPrevious,
    currentPage,
    totalPage,
  } = usePokeContext();

  if (allPokesLoading)
    return (
      <View>
        <Text>Loading ....</Text>
      </View>
    );

  const disablePrevious = currentPage === 0;
  const disableNext = total === 0 || currentPage + 1 === totalPage;

  return (
    <View>
      <View className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {pokes?.map((poke, index) => (
          <View key={index} className="justify-center items-center">
            <img
              src={getImageURL(extractNumberFromString(poke.url))}
              alt={poke.name}
              className="w-24 h-24"
              loading="lazy"
            />
            <Text>{poke.name}</Text>
          </View>
        ))}
      </View>
      <View className="flex-row justify-center gap-2 mt-6">
        <button
          className="p-2 bg-red-900 rounded-md text-white mr-4 disabled:opacity-40 disabled:cursor-not-allowed select-none"
          onClick={getPrevious}
          disabled={disablePrevious}
        >
          Prev
        </button>
        <button
          className="p-2 bg-red-900 rounded-md text-white mr-4 disabled:opacity-40 disabled:cursor-not-allowed select-none"
          onClick={getNext}
          disabled={disableNext}
        >
          Next
        </button>
      </View>
    </View>
  );
};

export default PokeContainer;
