import AuthValidatorWrapper from "@/Components/auth/auth_validator_wrapper";
import LoginComponent from "@/Components/auth/login_page/login_page";
import DashboardPage from "@/Components/dashboard/dashboard";

function Home() {
  return (
    <div>
      <AuthValidatorWrapper>
        <DashboardPage></DashboardPage>
      </AuthValidatorWrapper>
    </div>
  );
}

export default Home;
