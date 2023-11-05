"use client";

import Image from "next/image";
import React from "react";
import styles from "./login_page.module.css";

function LoginPage() {
  return (
    <div className={styles.top_parent_container}>
      <div className={styles.art_work_container}>
        <Image
          className={styles.mobile_login_image_style}
          src="/images/login_page_images/art_work.svg"
          alt="art_work"
          width={1500}
          height={1500}
        ></Image>
      </div>

      {/* image container */}
      <div className={styles.image_container}>
        <Image
          className={styles.mobile_login_image_style}
          src="/images/login_page_images/daal_4k.jpg"
          alt="login_page"
          width={1500}
          height={1500}
        ></Image>
      </div>
      <section className={styles.info}>
        <h1 className={styles.app_name}>Mess Menu</h1>
        <p className={styles.p1}>
          Vote for your favourite dishes and help us serve you better.
        </p>
        <p className={styles.p2}>Login to get started.</p>
        <GoogleButton />
      </section>
    </div>
  );
}

function GoogleButton() {
  return (
    <div className={styles.google_button_container}>
      <div className={styles.google_button}>
        <Image
          className={styles.google_logo}
          src="/images/login_page_images/google_logo.svg"
          alt="google sign-in button"
          width={30}
          height={30}
        ></Image>
        <p className={styles.google_button_text}>Sign in with Google</p>
      </div>
    </div>
  );
}

export default LoginPage;
