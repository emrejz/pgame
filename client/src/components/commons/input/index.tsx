import { SearchSvg } from "@/components/svgs";
import styles from "./index.module.scss";
import { Box, Button, Text } from "..";

interface InputProps {
  className?: string;
  placeholder?: string;
  data?: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  className,
  placeholder,
  data,
  onChange,
  ...props
}) => {
  return (
    <div className={styles.inputContainer}>
      <input
        placeholder={placeholder || ""}
        className={`${styles.input} ${className}`}
        onChange={onChange}
        {...props}
      />
      <SearchSvg />
      {data?.length && (
        <Box
          fd="column"
          ai="flex-start"
          gap="10px"
          className={styles.completeBox}
        >
          {data?.map((text) => (
            <Button key={text}>
              <Text>{text}</Text>
            </Button>
          ))}
        </Box>
      )}
    </div>
  );
};

export default Input;
