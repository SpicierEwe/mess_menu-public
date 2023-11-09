"use client";

import styles from "./leaderboard.module.css";

import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get, onValue, set } from "firebase/database";
import { initFirebase } from "@/Firebase/firebase";
import Image from "next/image";
import { AiTwotoneStar } from "react-icons/ai";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import NavComponent from "../nav/nav";

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
  function xx(week_day_name) {
    const highest_voted_dishes = {
      breakfast: {},
      lunch: {},
      snacks: {},
      dinner: {},
    };

    meal_menu_data[week_day_name]?.map((data, index) => {
      const dish_data_list = data[Object.keys(data)];
      dish_data_list.map((dish_data, index) => {
        const meal_type = Object.keys(data)[0];
        for (const voted_id in global_votes) {
          let max_votes = 0;
          if (voted_id === dish_data.dish_id) {
            if (global_votes[voted_id].votes > max_votes) {
              max_votes = global_votes[voted_id].votes;
              highest_voted_dishes[meal_type.toLowerCase()] = {
                votes: max_votes,
                meal_type: meal_type,
                week_day_name: week_day_name,
                dish_data: dish_data,
              };
            }
          }
        }
      });
    });

    return highest_voted_dishes;
  }

  useEffect(() => {
    fetch_menu_data();
  }, []);

  // ==================== RENDER ==================== //
  return (
    <div className={styles.main_container}>
      <div>
        <div>
          <NavComponent />
          <table className={styles.table}>
            <thead className={styles.table_head}>
              <tr>
                <th>Weekdays</th>
                {meal_types_list.map((meal_type, index) => (
                  <th key={index}>{meal_type}</th>
                ))}
              </tr>
            </thead>
            <tbody className={styles.table_body}>
              {week_days.map((week_day, index) => (
                <tr key={index}>
                  <td className={styles.week_day}>{week_day}</td>
                  {meal_types_list.map((meal_type, index) => {
                    const dish = xx(week_day.toLowerCase())[
                      meal_type.toLowerCase()
                    ]["dish_data"];
                    return (
                      <td key={index}>
                        {dish && (
                          <div className={styles.container}>
                            <div className={styles.dish_image_container}>
                              {/* ========= */}
                              <div className={styles.banner_container}>
                                {/* most voted dish banner */}

                                <div className={styles.banner_most_voted_dish}>
                                  <AiTwotoneStar />
                                  <p> MOST VOTED</p> <AiTwotoneStar />
                                </div>
                              </div>

                              <Image
                                className={styles.dish_image}
                                src={`/images/dish_images/${dish?.dish_id}.jpg`}
                                alt="dish_image"
                                height="1500"
                                width="1500"
                                priority={true}
                              ></Image>
                            </div>

                            <div className={styles.dish_info_container}>
                              {/* DISH NAME */}
                              <p className={styles.dish_name}>
                                {/* {dish.dish_name + " id = " + dish.dish_id} */}
                                {dish?.dish_name}
                              </p>

                              <div className={styles.dish_votes_container}>
                                {/* DISH VOTES */}

                                <div>
                                  {
                                    <p className={styles.dish_votes}>
                                      {Object.keys(global_votes).includes(
                                        dish?.dish_id
                                      )
                                        ? global_votes[dish?.dish_id].votes
                                        : 0}
                                      &nbsp; votes
                                    </p>
                                  }
                                </div>

                                <MdOutlineKeyboardDoubleArrowUp
                                  className={styles.votes_up_arrow_icon}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        {/* this would be shown where their is no dish selected */}
                        {!dish && (
                          <div className={styles.container_empty}>〜</div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* {JSON.stringify(filtered_data)} */}
    </div>
  );
}

export default LeaderboardComponent;
