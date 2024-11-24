interface SortingSvgProps {
  fill?: string;
  width?: string;
  height?: string;
}
const SortingSvg: React.FC<SortingSvgProps> = ({
  fill,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? "30px"}
      height={height ?? "30px"}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path d="M11 19H8V16H11V19Z" fill={fill ?? "#706f78"} />
      <path d="M11 13.5H8V10.5H11V13.5Z" fill={fill ?? "#706f78"} />
      <path d="M11 8H8V5H11V8Z" fill={fill ?? "#706f78"} />
      <path d="M16 19H13V16H16V19Z" fill={fill ?? "#706f78"} />
      <path d="M16 13.5H13V10.5H16V13.5Z" fill={fill ?? "#706f78"} />
      <path d="M16 8H13V5H16V8Z" fill={fill ?? "#706f78"} />
    </svg>
  );
};

export default SortingSvg;
