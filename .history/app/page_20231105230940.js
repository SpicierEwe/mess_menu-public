import AuthValidatorWrapper from "@/Components/auth/auth_validator_wrapper";
import LoginComponent from "@/Components/auth/login_page/login_page";
import CustomLayout from "@/Components/custom_layout_file/custom_layout";
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
