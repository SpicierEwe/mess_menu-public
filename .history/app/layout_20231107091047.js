import { Inter } from "next/font/google";
import "./globals.css";
import AuthValidatorWrapper from "@/Components/auth/auth_validator_wrapper";
import MyProvider from "@/context/global_context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthValidatorWrapper>
          <MyProvider>{children}</MyProvider>{" "}
        </AuthValidatorWrapper>
      </body>
    </html>
  );
}
