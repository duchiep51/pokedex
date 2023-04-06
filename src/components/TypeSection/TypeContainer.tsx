import { Text, View } from "react-native";
import { usePokeContext } from "../../../contexts/PokeContext";
import Result from "./Result";
import TypeList from "./TypeList";

const TypeContainer = () => {
  const { typesIsLoading } = usePokeContext();

  if (typesIsLoading)
    return (
      <View>
        <Text className="text-base">Loading types...</Text>
      </View>
    );

  return (
    <View className="mx-auto max-w-screen-xl">
      <View className="flex-row">
        <Text className="mr-2 my-4 font-bold self-start">Types: </Text>
        <TypeList />
      </View>
      <Result />
    </View>
  );
};

export default TypeContainer;
