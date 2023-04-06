import { Text, View } from "react-native";
import { usePokeContext } from "../../../contexts/PokeContext";

const PokeList = () => {
  const { pokes } = usePokeContext();

  return (
    <View className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
      {pokes?.map((poke, index) => (
        <View key={index} className="justify-center items-center">
          <img
            src={poke.image}
            alt={poke.name}
            className="w-24 h-24"
            loading="lazy"
          />
          <Text>{poke.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default PokeList;
