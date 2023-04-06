import React from "react";
import { Image, Text, View } from "react-native";
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
  const disableNext = currentPage + 1 === totalPage;

  return (
    <View>
      <View>
        <Text>{total > 0 ? `${total} results found` : "No result found"}</Text>
      </View>

      <View className="grid grid-cols-3 gap-4 bg-red">
        {(pokes || []).map((poke, index) => (
          <View key={index} className="justify-center items-center">
            <Image
              className="w-24 h-24"
              source={getImageURL(extractNumberFromString(poke.url)) as any}
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
