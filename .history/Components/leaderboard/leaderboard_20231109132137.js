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
  const [filtered_data, set_filtered_data] = useState([]);

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
        get_global_votes(data);

        // set_meal_menu_data(data);
      } else {
        console.log("No data available");
      }
    });
  }

  function aa() {
    {
      return week_days.map((week_day, index) => (
        <tr key={index}>
          <td>{week_day}</td>
          {}
        </tr>
      ));
    }
  }

  // GET GLOBAL VOTES
  //==========================
  const [global_votes, set_global_votes] = useState([]);

  function get_global_votes(menu_data) {
    const dbRef = ref(database, "/global_votes");
    // Set up a listener to get realtime updates
    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const votes_data = snapshot.val();
        // console.log(snapshot.val());
        set_global_votes(snapshot.val());

        /* Find the highest-voted dish separately */

        //

        // ===================================
      } else {
        console.log("No data available");
      }
    });
  }

  // ==================== DATA FILTER FUNCTION ==================== //
  // filters the data to only the data which is voted
  function data_filter_function() {
    console.log("x() function called");
    for (const x in global_votes) {
      const dish_id = x;

      for (const week_day_name in meal_menu_data) {
        meal_menu_data[week_day_name].map((meal, index) => {
          meal[Object.keys(meal)].map((dish, index) => {
            // console.log("dish_id = " + dish.dish_id);
            // console.log("voted dish_id = " + dish_id);

            if (dish_id == dish.dish_id) {
              console.log("DISH FOUND id = " + dish_id);

              set_filtered_data((prev) => [
                ...prev,
                {
                  dish_data: dish,
                  week_day: week_day_name,
                  meal_type: Object.keys(meal)[0],
                },
              ]);
            }
          });
        });
      }
    }
  }

  useEffect(() => {
    fetch_menu_data();
  }, []);

  useEffect(() => {
    data_filter_function();
  }, [meal_menu_data, global_votes]);

  // ==================== RENDER ==================== //
  return (
    <div className={styles.main_container}>
      <div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Weekdays</th>
              </tr>

              {meal_types_list.map((meal_type, index) => (
                <th key={index}>{meal_type}</th>
              ))}
            </thead>
            <tbody>
              <tr>
                {week_days.map((week_day, index) => {

                  <tr  key={index}>   <
                    td>{week_day}</> {
                    meal_types_list.map((meal_type, index) => (
                      <td key={index}>
                        {filtered_data.map((data, index) => {
                          if (
                            data["week_day"] == week_day.toLowerCase() &&
                            data["meal_type"] == meal_type.toLowerCase()
                          ) {
                            return data.dish_data.dish_name;
                          }
                        })}
                      </td>
                    ));
                  } </tr>
                 
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* {JSON.stringify(filtered_data)} */}
    </div>
  );
}

export default LeaderboardComponent;
