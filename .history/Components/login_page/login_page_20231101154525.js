import Image from "next/image";
import React from "react";
import styles from "./login_page.module.css";

function LoginPage() {
  return (
    <div>
      <Image
        className={styles.mobile_login_design_style}
        src="images/login_page_images/mobile_login_design.svg"
        alt="login_page"
        width={500}
        height={500}
      ></Image>
    </div>
  );
}

export default LoginPage;
