"use client";
import data from "../../Database/database.json";

import styles from "./dashboard.module.css";
import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initFirebase } from "@/Firebase/firebase";
import Image from "next/image";

function DashboardComponent() {
  const app = initFirebase();
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  // ==================== MEAL TYPES ==================== //
  const meal_types_list = ["Breakfast", "Lunch", "Snacks", "Dinner"];

  const week_days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [selected_meal_type, set_selected_meal_type] = useState(
    meal_types_list[0]
  );

  const today = new Date();
  const [selected_week_day, set_selected_week_day] = useState(
    week_days[today.getDay()]
  );

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

      <main className={styles.main_flex}>
        {/* ================ */}
        {/* Container 1 */}
        {/* Contains week names */}
        <section className={styles.container_1}>
          {week_days.map((day, index) => {
            return (
              <div
                key={index}
                // highlight selected day
                className={`${styles.week_name_container} ${
                  selected_week_day == day ? styles.selected_week_styles : null
                }`}
                onClick={() => {}}
              >
                <p className={styles.week_day_name_initial}>
                  {day[0].toUpperCase()}
                </p>
                <p className={styles.week_day_name}>{day}</p>
              </div>
            );
          })}
        </section>

        {/* ============ */}
        {/* Container 2 */}
        {/* Contains dishes */}

        <section className={styles.container_2}>
          {/* FILTERS */}
          <div></div>

          <div>{}</div>
        </section>
      </main>
    </div>
  );
}

export default DashboardComponent;
