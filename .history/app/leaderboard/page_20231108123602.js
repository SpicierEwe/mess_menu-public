import LeaderboardComponent from "@/Components/leaderboard/leaderboard";
import React from "react";

function LeaderboardPage() {
  <Link href={"/leaderboard"}>
    <li className={styles.button}>
      <p>LEADERBOARD</p>
    </li>
  </Link>;
  return (
    <div>
      <LeaderboardComponent />
    </div>
  );
}

export default LeaderboardPage;
