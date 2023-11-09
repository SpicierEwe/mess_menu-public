"use client";

import styles from "./leaderboard.module.css";

import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get, onValue } from "firebase/database";
import { initFirebase } from "@/Firebase/firebase";

function LeaderboardComponent() {
  const database = getDatabase();
  const app = initFirebase();
  const auth = getAuth();

  const [user, loading, error] = useAuthState(auth);

  // ==================== MEAL TYPES ==================== //
  const meal_types_list = ["Breakfast", "Lunch", "Snacks", "Dinner"];

  // ==================== MEAL TYPES ==================== //
  const week_days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  // manages stat of selected week day
  const [meal_menu_data, set_meal_menu_data] = useState([]);

  // == FETCH MENU DATA ==================== //
  // == FETCH MENU DATA ==================== //
  // == FETCH MENU DATA ==================== //
  const menu_id = "menu_id_1";
  function fetch_menu_data() {
    // ***********************************
    // fetch menu data from the database
    // ***********************************
    const dbRef = ref(database, "/menus/" + menu_id + "/".toLowerCase());
    get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        // console.log("This is the fetch menu function and data");

        const data = snapshot.val();

        set_meal_menu_data(data);
      } else {
        console.log("No data available");
      }
    });
  }

  // GET GLOBAL VOTES
  //==========================
  const [global_votes, set_global_votes] = useState([]);

  function get_global_votes() {
    const dbRef = ref(database, "/global_votes");
    // Set up a listener to get realtime updates
    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log(snapshot.val());
        set_global_votes(snapshot.val());
        /* Find the highest-voted dish separately */

        //

        // ===================================
      } else {
        console.log("No data available");
      }
    });
  }

  useEffect(() => {
    fetch_menu_data();
    get_global_votes();
  }, []);

  // ==================== RENDER ==================== //
  return (
    <div className={styles.main_container}>
      <table>
        <thead>
          <tr>
            <th>Weekdays</th>
            {meal_types_list.map((meal_type, index) => (
              <th key={index}>{meal_type}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {week_days.map((week_day, index) => (
            // tr -
            <tr key={index}>
              <td>{week_day}</td>
              {meal_types_list.map((meal_type, index) => {
                const weekday_data = meal_menu_data[week_day.toLowerCase()];
                return (
                  weekday_data && (
                    <td key={index}>
                      {weekday_data.map((meal_type_data, index) => {
                        const meal_type_name = Object.keys(meal_type_data);

                        return JSON.stringify(
                          meal_type_data[meal_type_name].map((dish, index) => {
                            return dish.dish_id;
                          })
                        );
                      })}
                    </td>
                  )
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaderboardComponent;
