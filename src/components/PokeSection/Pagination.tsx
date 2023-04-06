import { View } from "react-native";
import { usePokeContext } from "../../../contexts/PokeContext";
import ActionButton from "./ActionButton";

const Pagination = () => {
  const { total, getNext, getPrevious, currentPage, totalPage } =
    usePokeContext();

  const disablePrevious = currentPage === 0;
  const disableNext = total === 0 || currentPage + 1 === totalPage;

  return (
    <View className="flex-row justify-center gap-2 mt-6">
      <ActionButton onClick={getPrevious} disable={disablePrevious}>
        Prev
      </ActionButton>
      <ActionButton onClick={getNext} disable={disableNext}>
        Next
      </ActionButton>
    </View>
  );
};

export default Pagination;
