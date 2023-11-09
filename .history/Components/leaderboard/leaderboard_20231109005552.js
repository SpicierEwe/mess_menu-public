"use client";

import styles from "./leaderboard.module.css";

import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get, onValue, set } from "firebase/database";
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

        get_global_votes(data);
        // set_meal_menu_data(data);
      } else {
        console.log("No data available");
      }
    });
  }

  // GET GLOBAL VOTES
  //==========================
  const [global_votes, set_global_votes] = useState([]);

  function get_global_votes(menu_data) {
    const dbRef = ref(database, "/global_votes");
    // Set up a listener to get realtime updates
    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        // console.log(snapshot.val());
        set_global_votes(snapshot.val());

        for (const x in data) {
          const dish_id = data[x];

          menu_data[Object.keys(menu_data)].map((day, index) => {
            console.log(menu_data[Object.keys(menu_data)]);
            day[Object.keys(day)].map((meal_type_data, index) => {
              meal_type_data.map((dish, index) => {
                if (dish.id == dish_id) {
                  console.log("FOUND");
                  console.log(dish);
                }
              });
            });
          });
        }
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
        <tbody></tbody>
      </table>
      {JSON.stringify(meal_menu_data)}
    </div>
  );
}

export default LeaderboardComponent;
