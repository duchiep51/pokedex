import { View } from "react-native";
import PokeProvider from "./contexts/PokeContext";
import PokeContainer from "./src/components/PokeSection/PokeContainer";
import TypeContainer from "./src/components/TypeSection/TypeContainer";
import "./style.css";
import { SWRConfig } from "swr";

export default function App() {
  return (
    <PokeProvider>
      <SWRConfig
        value={{
          revalidateIfStale: false,
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
        }}
      >
        <View className="flex-1 bg-red p-6">
          <TypeContainer />
          <PokeContainer />
        </View>
      </SWRConfig>
    </PokeProvider>
  );
}
