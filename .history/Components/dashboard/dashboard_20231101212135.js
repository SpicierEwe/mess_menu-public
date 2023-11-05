"use client";

import styles from "./dashboard.module.css";
import React from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initFirebase } from "@/Firebase/firebase";
import Image from "next/image";

function DashboardComponent() {
  const app = initFirebase();
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  return (
    <div>
      <nav className={styles.nav}>
        <li>LOGO</li>
        {/* <li className={styles.switchers}>
          <h3>Global Poll</h3>
          <h3>Vote your Dish</h3>
        </li> */}

        <li className={styles.user_photo_container}>
          <Image
            className={styles.user_photo}
            src={user.photoURL}
            alt="user_photo"
            height="50"
            width="50"
          ></Image>
        </li>
      </nav>

      {/* switchers  */}
      <div className={styles.switchers}>
        <h3 className={styles.switchers_1}>Global Poll</h3>
        <h3 className={styles.switchers_2}>Vote your Dish</h3>
      </div>
    </div>
  );
}

export default DashboardComponent;
