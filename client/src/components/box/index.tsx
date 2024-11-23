import styles from "./index.module.css";

interface BoxProps {
  children: React.ReactNode;
  className?: string;
}

const Text: React.FC<BoxProps> = ({ children, className, ...props }) => {
  return (
    <div className={`${styles.text} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Text;
