import { Text, View } from "react-native";
import { usePokeContext } from "../../contexts/PokeContext";
import TypeButton from "./TypeButton";

const TypeContainer = () => {
  const { types, typesIsLoading, total } = usePokeContext();

  if (typesIsLoading)
    return (
      <View>
        <Text className='text-base'>Loading types...</Text>
      </View>
    );

  return (
    <View className="mx-auto max-w-screen-xl">
      <View className="flex-row">
        <Text className="mr-2 my-4 font-bold self-start">Types: </Text>
        <View className="flex-row flex-1 flex-wrap">
          {(types || []).map((type) => (
            <TypeButton key={type.name} typeName={type.name} />
          ))}
        </View>
      </View>
      {total > 0 ? (
        <View className="my-12 mx-4">
          <Text className="font-bold text-base">{total} results found.</Text>
        </View>
      ) : (
        <View className="text-center mx-auto my-24">
          <Text className="font-bold text-base text-3xl">No result found.</Text>
        </View>
      )}
    </View>
  );
};

export default TypeContainer;
