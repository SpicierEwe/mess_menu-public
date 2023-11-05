import styles from "./dashboard.module.css";
import React from "react";
import { getAuth } from "@/Firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function DashboardComponent() {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  return (
    <div>
      <nav className={styles.nav}>
        <li>{user.toString}</li>
        <li></li>
        <li></li>
      </nav>
    </div>
  );
}

export default DashboardComponent;
