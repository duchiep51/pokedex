import { usePokeContext } from "../../../contexts/PokeContext";

const TypeButton = ({ typeName }: { typeName: string }) => {
  const { addType, removeType, pickedTypes } = usePokeContext();

  const isActive = pickedTypes?.some((p) => p === typeName);
  const handleOnClick = () => isActive ? removeType(typeName) : addType(typeName);

  return (
    <button
      className={`${
        isActive ? "bg-red-900 text-white" : "text-red-900"
      } p-2 m-2 border-red-900 border-2 border-2 rounded-md font-bold`}
      onClick={handleOnClick}
    >
      {typeName}
    </button>
  );
};

export default TypeButton;
