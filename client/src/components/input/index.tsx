import { SearchSvg } from "../svgs";
import styles from "./index.module.scss";

interface InputProps {
  className?: string;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ className, placeholder, ...props }) => {
  return (
    <div className={styles.inputContainer}>
      <input
        placeholder={placeholder || ""}
        className={`${styles.input} ${className}`}
        {...props}
      />
      <SearchSvg />
    </div>
  );
};

export default Input;
