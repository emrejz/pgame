import styles from "./index.module.scss";

interface BoxProps {
  children: React.ReactNode;
  className?: string;
  fd?: "row" | "column" | "row-reverse" | "column-reverse";
  ai?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "baseline"
    | "stretch"
    | "space-between"
    | "space-around"
    | "space-evenly";
  jc?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "baseline"
    | "stretch"
    | "space-between"
    | "space-around"
    | "space-evenly";
  gap?: string;
  style?: React.CSSProperties;
}

const Text: React.FC<BoxProps> = ({
  fd = "row",
  ai = "center",
  jc = "flex-start",
  gap,
  style,
  children,
  className,
  ...props
}) => {
  const boxStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: fd,
    alignItems: ai,
    justifyContent: jc,
    gap: gap,
    ...style,
  };
  return (
    <div style={boxStyle} className={`${styles.box} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Text;
