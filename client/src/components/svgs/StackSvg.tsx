interface StackSvgProps {
  fill?: string;
  width?: string;
  height?: string;
}
const StackSvg: React.FC<StackSvgProps> = ({
  fill,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill || "white"}
      viewBox="0 0 16 16"
      width={width || "16px"}
      height={height || "16px"}
      {...props}
    >
      <path
        d="M0 10l8 4 8-4v2l-8 4-8-4v-2zm0-4l8 4 8-4v2l-8 4-8-4V6zm8-6l8 4-8 4-8-4 8-4z"
        fill-rule="evenodd"
      />
    </svg>
  );
};

export default StackSvg;
