type Props = {
  children: string | JSX.Element | JSX.Element[];
  onClick?: () => void;
};

export const Button: React.FC<Props> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="my-3 bg-green-700 hover:bg-green-800 py-1 w-36 text-white font-semibold rounded-md border-2 border-green-800"
    >
      {children}
    </button>
  );
};
