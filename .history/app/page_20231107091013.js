import AuthValidatorWrapper from "@/Components/auth/auth_validator_wrapper";

import DashboardComponent from "@/Components/dashboard/dashboard";
import MyProvider from "@/context/global_context";

function Home() {
  return (
    <div>
      <MyProvider>
        {" "}
        <DashboardComponent></DashboardComponent>
      </MyProvider>
    </div>
  );
}

export default Home;
