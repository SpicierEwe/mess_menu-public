import React from "react";
import NavComponent from "../nav/nav";

export default function Layout({ children }) {
  return (
    <div>
      <NavComponent />
      <main>{children}</main>
    </div>
  );
}
