"use client";

import styles from "./dashboard.module.css";
import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initFirebase } from "@/Firebase/firebase";
import Image from "next/image";

function DashboardComponent() {
  const meal_types_list = ["Breakfast", "Lunch", "Snacks", "Dinner"];

  const [selectedSwitch, setSelectedSwitch] = useState(switchesList[0]);

  const app = initFirebase();
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  return (
    <div>
      <nav className={styles.nav}>
        <li>LOGO</li>

        <li>
          <button
            onClick={() => {
              auth.signOut();
            }}
          >
            LOG OUT
          </button>
        </li>

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
    </div>
  );
}

export default DashboardComponent;
