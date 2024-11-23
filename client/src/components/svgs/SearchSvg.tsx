interface SearchSvgProps {
  fill?: string;
  width?: string;
  height?: string;
}
const SearchSvg: React.FC<SearchSvgProps> = ({
  fill,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "18px"}
      height={height || "18px"}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
        stroke={fill || "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SearchSvg;
