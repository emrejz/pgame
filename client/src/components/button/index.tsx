import styles from "./index.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  className,
  ...props
}) => {
  return (
    <button
      disabled={disabled}
      className={`${styles.button} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
