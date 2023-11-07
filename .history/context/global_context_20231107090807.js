import React, { createContext, useContext, useReducer } from "react";

// Create a new context
const MyContext = createContext({
  is_mobile_nav_open: false,
  update_mobile_nav_bool_function: () => {},
});

function MyProvider({ children }) {
  // Define the initial state and a reducer function (optional)

  const [mobile_nav_bool, set_mobile_nav_bool] = useState(false);

  function update_mobile_nav_bool_function(mobile_nav_bool) {
    set_mobile_nav_bool(mobile_nav_bool);
    /* Your initial state here */
  }

  const initialState = {
    is_mobile_nav_open: mobile_nav_bool,
    update_mobile_nav_bool_function: update_mobile_nav_bool_function,
  };

  return (
    <MyContext.Provider value={initialState}>{children}</MyContext.Provider>
  );
}
