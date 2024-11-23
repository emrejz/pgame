import Image from "next/image";
import styles from "./index.module.scss";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Image
        src={"/images/logo.png"}
        alt="logo"
        layout="intrinsic"
        width={320}
        height={54}
        quality={100}
      />
    </header>
  );
};
export default Header;
