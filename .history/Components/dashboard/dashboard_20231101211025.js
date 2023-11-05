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
        <ul>
          <li className={styles.user_photo_container}>
            <Image
              className={styles.user_photo}
              src={user.photoURL}
              alt="user_photo"
              height="50"
              width="50"
            ></Image>
          </li>
          <li></li>
          <li></li>
        </ul>
      </nav>
    </div>
  );
}

export default DashboardComponent;
