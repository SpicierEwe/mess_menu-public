import { Inter } from "next/font/google";
import "./globals.css";
import AuthValidatorWrapper from "@/Components/auth/auth_validator_wrapper";
import MyProvider from "@/context/global_context";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description:
    "Meal Menu App allows you to vote for your favourite meals. The dish with max votes is selected and is served.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        ></meta>
      </Head>
      <body className={inter.className}>
        <AuthValidatorWrapper>
          <MyProvider>{children}</MyProvider>
        </AuthValidatorWrapper>
      </body>
    </html>
  );
}
