import { createContext, useContext } from "react";
import useType from "../hooks/usePoke";

type Props = ReturnType<typeof useType>;
const PokeContext = createContext<Props>({} as Props);

export default function PokeProvider({ children }) {
  const poke = useType();
  return <PokeContext.Provider value={poke}>{children}</PokeContext.Provider>;
}

export const usePokeContext = () => {
  return useContext(PokeContext);
};
