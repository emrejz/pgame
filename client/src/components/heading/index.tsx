import styles from "./index.module.scss";

interface HeadingProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  color?: "white" | "blue" | "gray";
  children: React.ReactNode;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({
  as = "h1",
  children,
  className,
  color = "white",
  ...props
}) => {
  const Component = as;

  return (
    <Component
      className={`${styles.heading} ${styles[as]} ${styles[color]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Heading;
