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
        <li className={styles.user_photo}>
          <Image
            src={user.photoURL}
            alt="user_photo"
            height="50px"
            width="50px"
          ></Image>
        </li>
        <li></li>
        <li></li>
      </nav>
    </div>
  );
}

export default DashboardComponent;
