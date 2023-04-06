const ActionButton = ({
  onClick,
  disable,
  children,
}: {
  onClick: () => void;
  disable: boolean;
  children: string;
}) => {
  return (
    <button
      className="p-2 bg-red-900 rounded-md text-white mr-4 disabled:opacity-40 disabled:cursor-not-allowed select-none"
      onClick={onClick}
      disabled={disable}
    >
      {children}
    </button>
  );
};

export default ActionButton;
