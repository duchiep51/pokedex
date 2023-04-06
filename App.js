import { View } from "react-native";
import PokeProvider from "./contexts/PokeContext";
import PokeContainer from "./src/components/PokeContainer";
import TypeContainer from "./src/components/TypeContainer";
import "./style.css";

export default function App() {
  return (
    <PokeProvider>
      <View className="flex-1 bg-red p-6">
        <TypeContainer />
        <PokeContainer />
      </View>
    </PokeProvider>
  );
}
