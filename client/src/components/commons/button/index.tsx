import styles from "./index.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  className,
  onClick,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
