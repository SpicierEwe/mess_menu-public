import Image from "next/image";
import styles from "./loading_screen.module.css";

function LoadingScreenComponent() {
  return (
    <div className={styles.container}>
      <Image
        src="/images/logo/company_logo.png"
        alt="loading_screen"
        height="500"
        width="500"
      ></Image>
    </div>
  );
}

export default LoadingScreenComponent;
