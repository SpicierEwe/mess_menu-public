import LeaderboardComponent from "@/Components/leaderboard/leaderboard";
import React from "react";

function LeaderboardPage() {
  const database = getDatabase();
  const app = initFirebase();
  const auth = getAuth();

  const [user, loading, error] = useAuthState(auth);
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
  }
  return (
    <div>
      <LeaderboardComponent />
    </div>
  );
}

export default LeaderboardPage;