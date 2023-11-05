import styles from "./dashboard.module.css";
import React from "react";
import { auth } from "@/Firebase/firebase";

function DashboardComponent() {
  return (
    <div>
      <nav className={styles.nav}>
        <li></li>
        <li></li>
        <li></li>
      </nav>
    </div>
  );
}

export default DashboardComponent;
