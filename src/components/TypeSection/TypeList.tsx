import { View } from "react-native";
import { usePokeContext } from "../../../contexts/PokeContext";
import TypeButton from "./TypeButton";

const TypeList = () => {
  const { types } = usePokeContext();
  return (
    <View className="flex-row flex-1 flex-wrap">
      {(types || []).map((type) => (
        <TypeButton key={type.name} typeName={type.name} />
      ))}
    </View>
  );
};

export default TypeList;
