import React, { createContext, useContext, useReducer } from "react";

// Create a new context
const MyContext = createContext({
  is_mobile_nav_open: false,
});

function MyProvider({ children }) {
  // Define the initial state and a reducer function (optional)

  const [mobile_nav_bool, set_mobile_nav_bool] = useState(false);

  function update_mobile_nav_bool_function(mobile_nav_bool) {
    set_mobile_nav_bool(mobile_nav_bool);
    /* Your initial state here */
  }

  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {children}
    </MyContext.Provider>
  );
}
