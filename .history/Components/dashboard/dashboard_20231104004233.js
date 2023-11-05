"use client";
import data from "../../Database/database.json";

import styles from "./dashboard.module.css";
import React, { useDeferredValue, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initFirebase } from "@/Firebase/firebase";
import Image from "next/image";
import { BsFire } from "react-icons/bs";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import {
  getDatabase,
  ref,
  set,
  update,
  push,
  child,
  get,
  query,
  orderByKey,
  limitToLast,
  onValue,
  orderByChild,
  startAt,
  equalTo,
  endAt,
  runTransaction,
  remove,
} from "firebase/database";

function DashboardComponent() {
  const app = initFirebase();
  const auth = getAuth();

  function fetch_menu_data() {
    const dbRef = ref(
      database,
      "/menus/menu_id_1/" + selected_week_day.toLowerCase()
    );
    // Set up a listener to get realtime updates
    get(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    });
  }

  useEffect(() => {
    fetch_menu_data();
  }, []);

  // ==================== AUTHENTICATION ==================== //

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

  // manages stat of selected meal type
  const [selected_meal_type, set_selected_meal_type] = useState(
    meal_types_list[0]
  );

  // temp
  const received_data = data[0][selected_week_day.toLowerCase()];

  // get global votes
  // const dbRef = ref(getDatabase());

  // GET GLOBAL VOTES
  //==========================
  const [global_votes, set_global_votes] = useState([]);
  const database = getDatabase();
  function get_global_votes() {
    const dbRef = ref(database, "/global_votes");
    // Set up a listener to get realtime updates
    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        set_global_votes(snapshot.val());
      } else {
        console.log("No data available");
      }
    });
  }

  useEffect(() => {
    get_global_votes();
  }, []);

  // voting function

  // voted dishes
  const [voted_dishes, set_voted_dishes] = useState([]);

  useEffect(() => {
    // get user voted dishes
    const userDbRef = ref(
      database,
      "/users/" + user.uid + "/" + data[1]["menu_id"] + "/voted_dishes/"
    );
    // Set up a listener to get realtime updates
    onValue(userDbRef, (snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        set_voted_dishes(snapshot.val());
      } else {
        console.log("No data available");
      }
    });
  }, []);
  // ========================== //
  // this function finds if dish already voted
  console.log(voted_dishes);
  function vote(dish_id, week_day, meal_type) {
    const new_voted_dish = {
      dish_id: dish_id,
      week_day: week_day,
      meal_type: meal_type,
    };

    const userDbRef = ref(
      database,
      "/users/" +
        user.uid +
        "/" +
        data[1]["menu_id"] +
        "/voted_dishes/" +
        dish_id
    );
    // function add_to_global_votes(dish_id) {
    //   const new_dish_voted = {
    //     dish_id: dish_id,
    //     votes: 1,
    //     user_id: user.uid,
    //   };

    //   // ====== UPDATING global  votes for the voted dish ======
    //   const dbRef = ref(database, "/global_votes/-" + dish_id);
    //   // Check if the votes for dish already exist
    //   get(dbRef).then((snapshot) => {
    //     if (snapshot.exists()) {
    //       console.log(snapshot.val());
    //       update(dbRef, {
    //         votes: snapshot.val().votes + 1,
    //       });
    //     } else {
    //       console.log("No data available");
    //       set(dbRef, new_dish_voted);
    //     }
    //   });
    // }
    function remove_from_global_votes(dish_id) {}
    function add_to_user_account_voted_dishes(dish_id) {
      // personal votes
      // ====== UPDATING personal votes for the voted dish ======

      get(userDbRef).then((snapshot) => {
        if (!snapshot.exists()) {
          console.log("No data available");
          set(userDbRef, {
            dish_id: dish_id,
          })
            .then(() => {
              console.log("New dish added to the user's voted dishes.");
            })
            .catch((error) => {
              console.error("Error setting data: ", error);
            });
        }
      });
    }

    function remove_from_user_account_voted_dishes(dish_id) {
      get(userDbRef).then((snapshot) => {
        if (snapshot.exists()) {
          // Delete the 'votes' property from the existing data
          remove(userDbRef).then(() => {
            console.log("Votes property removed from the user's voted dish.");
          });
        }
      });
    }

    // check already voted
    if (voted_dishes.length > 0) {
      const found = voted_dishes.find(
        (dish) => dish.week_day === week_day && dish.meal_type === meal_type
      );

      if (found) {
        // The dish is already voted, so remove it
        if (
          found.week_day == week_day &&
          found.meal_type == meal_type &&
          found.dish_id !== dish_id
        ) {
          // unselect the dish that was already selected and select the new one which is selected
          const updated_voted_dishes = voted_dishes.filter(
            (dish) => dish.dish_id !== found.dish_id
          );
          set_voted_dishes(updated_voted_dishes);
          remove_from_user_account_voted_dishes(found.dish_id);

          set_voted_dishes((prev) => [...prev, new_voted_dish]);
          add_to_user_account_voted_dishes(dish_id);

          console.log("switched to new dish");
        } else {
          // if the sleected dish is re clicked, then remove it
          const updated_voted_dishes = voted_dishes.filter(
            (dish) => dish.dish_id !== dish_id
          );
          set_voted_dishes(updated_voted_dishes);
          console.log("Dish removed because it was already voted.");
          remove_from_user_account_voted_dishes(dish_id);
        }
      } else {
        // The dish is not voted, so add it
        set_voted_dishes((prev) => [...prev, new_voted_dish]);
        console.log("Dish added because it was not voted.");
        add_to_user_account_voted_dishes(dish_id);
      }
    } else {
      // No dishes voted yet, so add the first one
      set_voted_dishes([new_voted_dish]);
      console.log("First dish voted.");
      add_to_user_account_voted_dishes(dish_id);
    }
  }

  //
  function highlight_voted_dish(dish_id) {
    if (voted_dishes.length > 0) {
      for (const dish of voted_dishes) {
        if (dish.dish_id === dish_id) {
          // console.log("DISH Found and highlighted");
          return true;
        }
      }
    }
    // console.log("DISH not Found");
    return false;
  }

  // ==================================================== //

  return (
    <div className={styles.main_parent_container}>
      {/* ================ */}
      {/* NAVIGATION BAR */}
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
              <p className={styles.guide_message}>
                Simply click on the dish you want to vote.
              </p>
              {received_data.map((meal_type, meal_type_index) => {
                return (
                  <div key={meal_type_index}>
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
                            // onClick for SELF VOTING
                            onClick={() => {
                              vote(
                                dish.dish_id,
                                selected_week_day,
                                Object.keys(meal_type)[0]
                              );
                            }}
                            key={index}
                            className={`${styles.single_dish_display_container}`}
                            style={
                              highlight_voted_dish(dish.dish_id)
                                ? { backgroundColor: "red", color: "white" }
                                : null
                            }
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
                                {dish.dish_name + dish.dish_id}
                              </p>

                              <div className={styles.dish_votes_container}>
                                {/* DISH VOTES */}
                                <p className={styles.dish_votes}>
                                  {/* {getDishById(dish.dish_id, global_votes)} */}
                                  &nbsp; votes
                                </p>
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
