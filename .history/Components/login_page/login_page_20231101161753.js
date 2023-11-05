import Image from "next/image";
import React from "react";
import styles from "./login_page.module.css";

function LoginPage() {
  return (
    <div className={styles.top_parent_container}>
      <div className={styles.image_container}>
        <Image
          className={styles.mobile_login_image_style}
          src="/images/login_page_images/dish_image.png"
          alt="login_page"
          width={500}
          height={500}
        ></Image>
      </div>
      <section className={styles.info}>
        <h1 className={styles.app_name}>Mess Menu</h1>
        <p className={styles.p1}>
          Vote for your favourite dishes and help us serve you better.
        </p>
      </section>
    </div>
  );
}

export default LoginPage;
