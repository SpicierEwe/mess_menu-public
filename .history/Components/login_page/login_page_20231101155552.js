import Image from "next/image";
import React from "react";
import styles from "./login_page.module.css";

function LoginPage() {
  return (
    <div className={styles.top_parent_container}>
      <Image
        className={styles.mobile_login_image_style}
        src="/images/login_page_images/daal_4k.jpg"
        alt="login_page"
        width={500}
        height={500}
      ></Image>

      <div>hiiii</div>
    </div>
  );
}

export default LoginPage;
