import React from "react";
import NavComponent from "../nav/nav";

export default function CustomLayout(props) {
  return (
    <div>
      <NavComponent />
      <main>{props.children}</main>
    </div>
  );
}
