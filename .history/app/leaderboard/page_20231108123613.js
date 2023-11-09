import LeaderboardComponent from "@/Components/leaderboard/leaderboard";
import React from "react";

function LeaderboardPage() {
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
  return (
    <div>
      <LeaderboardComponent />
    </div>
  );
}

export default LeaderboardPage;
