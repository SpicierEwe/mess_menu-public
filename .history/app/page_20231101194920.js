import AuthValidatorWrapper from "@/Components/auth/auth_validator_wrapper";
import LoginPage from "@/Components/auth/login_page/login_page";

function Home() {
  return (
    <div>
      <AuthValidatorWrapper></AuthValidatorWrapper>
    </div>
  );
}

export default Home;
