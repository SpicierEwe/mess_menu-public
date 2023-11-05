"use client";
import data from "../../Database/database.json";

import styles from "./dashboard.module.css";
import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initFirebase } from "@/Firebase/firebase";
import Image from "next/image";
import { BsFire } from "react-icons/bs";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";

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

  const today = new Date();

  // manages stat of selected week day
  const [selected_week_day, set_selected_week_day] = useState("monday");

  // useState(
  //   week_days[today.getDay() - 1]
  // );

  // manages stat of selected meal type
  const [selected_meal_type, set_selected_meal_type] = useState(
    meal_types_list[0]
  );

  // temp
  const received_data = data[0][selected_week_day.toLowerCase()];

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
                  selected_week_day.toLowerCase() === day.toLowerCase()
                    ? styles.selected_week_styles
                    : null
                }`}
                // weekday on click function
                onClick={() => {
                  // set selected day
                  set_selected_week_day(day.toLowerCase());
                }}
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
          {/* MEAL TYPES */}
          <div className={styles.meal_types_container}>
            {meal_types_list.map((type, index) => {
              return (
                <div
                  onClick={() => {
                    // highlight selected meal type
                    set_selected_meal_type(type.toLowerCase());
                  }}
                  className={`${
                    selected_meal_type.toLowerCase() === type.toLowerCase()
                      ? styles.selected_meal_type_style
                      : null
                  } ${styles.meal_type_style} `}
                  key={index}
                >
                  {type}
                </div>
              );
            })}
          </div>

          {/* DISHES */}
          <div className={styles.container_2_sub_main_container}>
            {/* Dishes */}
            <div>
              {received_data.map((meal_type, index) => {
                return (
                  <div key={index}>
                    {/* Heading */}
                    <div className={styles.headings}>
                      <h3>{Object.keys(meal_type)}</h3>
                      <p>All available dishes</p>
                    </div>
                    {/* Dishes display */}

                    <div className={styles.dishes_container}>
                      {meal_type[Object.keys(meal_type)].map((dish, index) => {
                        return (
                          <div
                            key={index}
                            className={styles.single_dish_display_container}
                          >
                            <div className={styles.dish_image_container}>
                              <Image
                                className={styles.dish_image}
                                src="/images/place_holder.jpg"
                                alt="dish_image"
                                height="1500"
                                width="1500"
                              ></Image>
                            </div>

                            <div className={styles.dish_info_container}>
                              {/* DISH NAME */}
                              <p className={styles.dish_name}>
                                {dish.dish_name}
                              </p>

                              <div className={styles.dish_votes_container}>
                                {/* DISH VOTES */}
                                <p className={styles.dish_votes}>256 votes</p>
                                <MdOutlineKeyboardDoubleArrowUp
                                  style={{ color: "red" }}
                                />
                              </div>

                              <div className={styles.vote_button_container}>
                                <p>VOTE</p>
                                <MdOutlineKeyboardDoubleArrowUp
                                  style={{ color: "red" }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default DashboardComponent;
