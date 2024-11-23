import styles from "./index.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button className={`${styles.button} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
