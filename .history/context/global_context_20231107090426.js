import React, { createContext, useContext, useReducer } from "react";

// Create a new context
const MyContext = createContext();

function MyProvider({ children }) {
  // Define the initial state and a reducer function (optional)
  const initialState = {
    /* Your initial state here */
  };
  const [state, dispatch] = useReducer(reducer, initialState); // Optional: Use useReducer for more complex state management

  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {children}
    </MyContext.Provider>
  );
}
