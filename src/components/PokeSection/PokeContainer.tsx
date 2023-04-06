import React from "react";
import { Text, View } from "react-native";
import { usePokeContext } from "../../../contexts/PokeContext";
import Pagination from "./Pagination";
import PokeList from "./PokeList";

const PokeContainer = () => {
  const { pokeDetailsIsLoading } = usePokeContext();

  if (pokeDetailsIsLoading)
    return (
      <View>
        <Text>Loading ....</Text>
      </View>
    );

  return (
    <View>
      <PokeList />
      <Pagination />
    </View>
  );
};

export default PokeContainer;
