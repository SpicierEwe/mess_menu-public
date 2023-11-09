import { Inter } from "next/font/google";
import "./globals.css";
import AuthValidatorWrapper from "@/Components/auth/auth_validator_wrapper";
import MyProvider from "@/context/global_context";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Meal Menu",
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

<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest"></link>
      </Head>
      <body className={inter.className}>
        <AuthValidatorWrapper>
          <MyProvider>{children}</MyProvider>
        </AuthValidatorWrapper>
      </body>
    </html>
  );
}
