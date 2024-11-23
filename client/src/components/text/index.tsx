import styles from "./index.module.css";

interface TextProps {
  color?: "white" | "blue" | "gray";
  children: React.ReactNode;
  className?: string;
}

const Text: React.FC<TextProps> = ({
  children,
  className,
  color = "white",
  ...props
}) => {
  return (
    <div className={`${styles.text} ${styles[color]} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Text;
