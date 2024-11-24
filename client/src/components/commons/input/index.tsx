"use client";

import { useState } from "react";
import { SearchSvg } from "@/components/svgs";
import { Box, Button, Text } from "..";
import styles from "./index.module.scss";

interface InputProps {
  className?: string;
  placeholder?: string;
  inputSearchOptions?: { text: string; id: string }[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  getSearchedPersonAndNeighbors: (id: string) => void;
}

const Input: React.FC<InputProps> = ({
  className,
  placeholder,
  inputSearchOptions,
  onChange,
  getSearchedPersonAndNeighbors,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 200);
  };

  return (
    <div className={styles.inputContainer}>
      <input
        placeholder={placeholder ?? ""}
        className={`${styles.input} ${className}`}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      <SearchSvg />
      {!!inputSearchOptions?.length && isFocused && (
        <Box
          fd="column"
          ai="flex-start"
          gap="10px"
          className={styles.completeBox}
        >
          {inputSearchOptions?.map(({ text, id }) => (
            <Button
              key={text}
              onClick={() => {
                getSearchedPersonAndNeighbors(id);
              }}
            >
              <Text>{text}</Text>
            </Button>
          ))}
        </Box>
      )}
    </div>
  );
};

export default Input;
