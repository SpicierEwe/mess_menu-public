"use client";

import styles from "./dashboard.module.css";
import React from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initFirebase } from "@/Firebase/firebase";

function DashboardComponent() {
  const app = initFirebase();
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  return (
    <div>
      <nav className={styles.nav}>
        <li>{JSON.stringify(user)}</li>
        <li></li>
        <li></li>
      </nav>
    </div>
  );
}

export default DashboardComponent;
