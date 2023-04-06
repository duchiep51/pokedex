import { Text, View } from "react-native";
import { usePokeContext } from "../../../contexts/PokeContext";

const Result = () => {
  const { total } = usePokeContext();
  return (
    <>
      {total > 0 ? (
        <View className="my-12 mx-4">
          <Text className="font-bold text-base">{total} results found.</Text>
        </View>
      ) : (
        <View className="text-center mx-auto my-24">
          <Text className="font-bold text-base text-3xl">No result found.</Text>
        </View>
      )}
    </>
  );
};


export default Result
