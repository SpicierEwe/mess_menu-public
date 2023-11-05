"use client";

import styles from "./dashboard.module.css";
import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initFirebase } from "@/Firebase/firebase";
import Image from "next/image";

function DashboardComponent() {
  const switchers = [
    {
      switch_name: "Global Poll",
      switch_id: "switch_1",
      styles: {
        backgroundColor: "#cd6a25",
        color: "white",
      },
    },
    {
      switch_name: "Vote your Dish",
      switch_id: "switch_2",
      styles: {
        backgroundColor: "#f05353",
        color: "white",
      },
    },
  ];

  const [selectedSwitch, setSelectedSwitch] = useState(switchers[0]);

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
        {switchers.map((switcher, index) => (
          <p
            className={styles.switch}
            style={
              selectedSwitchId == switcher.switch_id
                ? switcher.styles
                : { backgroundColor: "white", color: "black" }
            }
            key={index}
            onClick={() => {
              setSelectedSwitch(switcher);
            }}
          >
            {selectedSwitchId.switch_id}
          </p>
        ))}
      </div>
    </div>
  );
}

export default DashboardComponent;
