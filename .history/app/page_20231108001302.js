import AuthValidatorWrapper from "@/Components/auth/auth_validator_wrapper";

import DashboardComponent from "@/Components/dashboard/dashboard";
import LoadingScreenComponent from "@/Components/loading_screen/loading_screen";

function Home() {
  return (
    <div>
      <DashboardComponent></DashboardComponent>
      {/* <LoadingScreenComponent></LoadingScreenComponent> */}
    </div>
  );
}

export default Home;
