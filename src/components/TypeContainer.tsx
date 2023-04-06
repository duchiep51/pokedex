import { Text, View } from "react-native";
import { usePokeContext } from "../../contexts/PokeContext";
import TypeButton from "./TypeButton";

const TypeContainer = () => {
  const { types, typesIsLoading, } = usePokeContext();

  if (typesIsLoading)
    return (
      <View>
        <Text>Loading types...</Text>
      </View>
    );

  return (
    <View className="flex-row w-screen">
      <Text>Types: </Text>
      <View className="flex-row flex-1 flex-wrap">
        {(types || []).map((type) => (
          <TypeButton key={type.name} typeName={type.name} />
        ))}
      </View>
    </View>
  );
};

export default TypeContainer;
