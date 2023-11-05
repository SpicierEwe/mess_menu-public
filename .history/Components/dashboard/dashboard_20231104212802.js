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
  const database = getDatabase();
  const app = initFirebase();
  const auth = getAuth();

  // manages stat of selected week day
  const [selected_week_day, set_selected_week_day] = useState("monday");

  // == FETCH MENU DATA ==================== //
  // == FETCH MENU DATA ==================== //
  // == FETCH MENU DATA ==================== //
  const menu_id = "menu_id_1";
  function fetch_menu_data() {
    // ***********************************
    // fetch menu data from the database
    // ***********************************
    const dbRef = ref(
      database,
      "/menus/" + menu_id + "/" + selected_week_day.toLowerCase()
    );
    get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        // console.log("This is the fetch menu function and data");

        const data = snapshot.val();
        const modified_data = {
          [selected_week_day]: [...data],
        };

        // collect data for every selected week day

        set_meal_table_data((prev) => [...prev, modified_data]);
        // console.log(data);

        set_meal_table_weekday_data([...data]);

        // ======
        fetch_user_personal_voted_dishes(data);
      } else {
        console.log("No data available");
      }
    });

    /*
    this is [ inside of fetch_menu_data function  ]
 This function fetches the user's personal voted dishes from the database when they are fetched then each id is found in the menu data and then is trasfered to the voted dishes array as initial state.

 This function is called inside the fetch_menu_data function where adter the menuu data has been fetched.
*/
    function fetch_user_personal_voted_dishes(data) {
      const userDbRef = ref(
        database,
        "/users/" + user.uid + "/" + menu_id + "/voted_dishes/"
      );
      // Set up a listener to get realtime updates
      get(userDbRef).then((snapshot) => {
        if (snapshot.exists()) {
          // console.log("intial votes from user database");

          const personal_voted_dishes = snapshot.val();
          for (const key in personal_voted_dishes) {
            // console.log("ïnside key");

            data.map((meal_type, meal_type_index) => {
              meal_type[Object.keys(meal_type)].map((dish, dish_index) => {
                if (dish.dish_id === personal_voted_dishes[key]["dish_id"]) {
                  // console.log("found");
                  // console.log(dish);

                  const modified_dish_data = {
                    dish_id: dish.dish_id,
                    week_day: selected_week_day.toLowerCase(),
                    meal_type: Object.keys(meal_type)[0],
                  };

                  set_voted_dishes((prev) => [...prev, modified_dish_data]);
                }
              });
            });
          }
        } else {
          console.log("No data available");
        }
      });
    }
  }

  useEffect(() => {
    fetch_menu_data();
  }, [selected_week_day]);

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

  // manages stat of selected meal type
  const [selected_meal_type, set_selected_meal_type] = useState(
    meal_types_list[0]
  );

  // each individually fetched weekdays are stored here collectively
  const [meal_table_data, set_meal_table_data] = useState([]);

  // each individually fetched weekdays are stored here
  const [meal_table_weekday_data, set_meal_table_weekday_data] = useState([]);

  // get global votes
  // const dbRef = ref(getDatabase());

  // GET GLOBAL VOTES
  //==========================
  const [global_votes, set_global_votes] = useState([]);

  function get_global_votes() {
    const dbRef = ref(database, "/global_votes");
    // Set up a listener to get realtime updates
    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
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
  // console.log(voted_dishes);
  function vote(dish_id, week_day, meal_type) {
    //
    const new_voted_dish = {
      dish_id: dish_id,
      week_day: week_day,
      meal_type: meal_type,
    };

    // ========================== //
    // These functions are used to add and remove votes from the global votes and user account votes
    // ========================== //
    function add_to_global_votes(dish_id) {
      const new_dish_voted = {
        votes: 1,
      };

      // ====== UPDATING global  votes for the voted dish ======
      const dbRef = ref(database, "/global_votes/" + dish_id);
      // Check if the votes for dish already exist
      runTransaction(dbRef, (currentVotes) => {
        if (currentVotes === null) {
          return new_dish_voted; // Initialize with 1 vote if it doesn't exist
        } else {
          // Increment the votes by 1
          return {
            votes: currentVotes.votes + 1,
          };
        }
      })
        .then(() => {
          console.log("Votes updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating votes:", error);
        });
    }
    function decrease_global_votes(dish_id) {
      // ====== UPDATING global  votes for the voted dish ======
      const dbRef = ref(database, "/global_votes/" + dish_id);
      // Check if the votes for dish already exist
      runTransaction(dbRef, (currentVotes) => {
        if (currentVotes === null) {
          return {
            votes: 0,
          };

          // decrease the votes by 1
        } else {
          console.log(currentVotes);
          if (currentVotes.votes > 0) {
            return {
              votes: currentVotes.votes - 1,
            };
          }
        }
      })
        .then(() => {
          console.log("Votes updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating votes:", error);
        });
    }
    function add_to_user_account_voted_dishes(dish_id) {
      // personal votes
      // ====== UPDATING personal votes for the voted dish ======
      const userDbRef = ref(
        database,
        "/users/" + user.uid + "/" + menu_id + "/voted_dishes/" + dish_id
      );

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
      const userDbRef = ref(
        database,
        "/users/" + user.uid + "/" + menu_id + "/voted_dishes/" + dish_id
      );
      get(userDbRef).then((snapshot) => {
        if (snapshot.exists()) {
          // Delete the 'votes' property from the existing data
          remove(userDbRef).then(() => {
            console.log("Votes property removed from the user's voted dish.");
          });
        }
      });
    }
    // ========================== //
    // ========================== //

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
          // unselect/delete the dish that was already selected and select the new one which is selected
          const updated_voted_dishes = voted_dishes.filter(
            (dish) => dish.dish_id !== found.dish_id
          );
          set_voted_dishes(updated_voted_dishes);

          // remove the previous dish from user account
          remove_from_user_account_voted_dishes(found.dish_id);
          decrease_global_votes(found.dish_id);

          set_voted_dishes((prev) => [...prev, new_voted_dish]);
          // add the new dish to global votes
          add_to_global_votes(dish_id);
          // add the new dish to user account
          add_to_user_account_voted_dishes(dish_id);

          console.log("switched to new dish");
        } else {
          // if the slected dish is re clicked, then remove it
          const updated_voted_dishes = voted_dishes.filter(
            (dish) => dish.dish_id !== dish_id
          );
          set_voted_dishes(updated_voted_dishes);
          decrease_global_votes(dish_id);
          remove_from_user_account_voted_dishes(dish_id);

          console.log("Dish removed because it was already voted.");
        }
      } else {
        // The dish is not voted, so add it

        set_voted_dishes((prev) => [...prev, new_voted_dish]);
        console.log("Dish added because it was not voted.");

        // add to global votes
        add_to_global_votes(dish_id);
        // add to user account
        add_to_user_account_voted_dishes(dish_id);
      }
    } else {
      // No dishes voted yet, so add the first one
      set_voted_dishes([new_voted_dish]);
      console.log("First dish voted.");
      // / add to global votes
      add_to_global_votes(dish_id);
      // add to user account
      add_to_user_account_voted_dishes(dish_id);
    }
  }

  //
  function highlight_voted_dish(dish_id) {
    if (voted_dishes.length != 0) {
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
              {meal_table_weekday_data.map((meal_type, meal_type_index) => {
                const sortedDishes = [...meal_type[Object.keys(meal_type)]];

                sortedDishes.sort((a, b) => {
                  const votesA = global_votes[a.dish_id]?.votes || 0;
                  const votesB = global_votes[b.dish_id]?.votes || 0;
                  return votesB - votesA;
                });
                return (
                  <div key={meal_type_index}>
                    {/* Heading */}
                    <div className={styles.headings}>
                      <h3>{Object.keys(meal_type)}</h3>
                      <p>All available dishes</p>
                    </div>
                    {/* Dishes display */}
                    {/* Dishes display */}
                    <div className={styles.dishes_container}>
                      {sortedDishes.map((dish, index) => {
                        return (
                          <div
                            onClick={() => {
                              vote(
                                dish.dish_id,
                                selected_week_day,
                                Object.keys(meal_type)[0]
                              );
                            }}
                            key={index}
                            className={`${
                              styles.single_dish_display_container
                            } ${
                              highlight_voted_dish(dish.dish_id)
                                ? styles.self_voted_dish_highlight_style
                                : null
                            }`}
                          >
                            {/* Dish content */}
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

                                <div>
                                  {
                                    <p className={styles.dish_votes}>
                                      {Object.keys(global_votes).includes(
                                        dish.dish_id
                                      )
                                        ? global_votes[dish.dish_id].votes
                                        : 0}
                                      &nbsp; votes
                                    </p>
                                  }
                                </div>

                                <MdOutlineKeyboardDoubleArrowUp
                                  style={{
                                    color: highlight_voted_dish(dish.dish_id)
                                      ? "white"
                                      : "red",
                                  }}
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
