import React from "react";
import NavComponent from "../nav/nav";

export default function CustomLayout({ children }) {
  return (
    <div>
      <NavComponent />
      <main>{children}</main>
    </div>
  );
}
