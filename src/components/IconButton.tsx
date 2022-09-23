const IconButton: React.FC<{
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  children?: JSX.Element;
}> = ({ onClick, children }) => {
  return (
    <div
      onClick={onClick}
      className="back-icon p-2 rounded-full hover:bg-first hover:cursor-pointer"
    >
      {children}
    </div>
  );
};

export default IconButton;
