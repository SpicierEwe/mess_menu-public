import AuthValidatorWrapper from "@/Components/auth/auth_validator_wrapper";

import DashboardComponent from "@/Components/dashboard/dashboard";

function Home() {
  return (
    <div>
      <AuthValidatorWrapper>
        <DashboardComponent></DashboardComponent>
      </AuthValidatorWrapper>
    </div>
  );
}

export default Home;
