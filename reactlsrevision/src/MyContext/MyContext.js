import React, { createContext, useReducer } from "react";

export const MyContext = createContext();

const initialState = { currentuser: null };

const reducer = (state, action) => {};

const MyContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);


  return (
    <>
      <MyContext.Provider value={{ state }}>{children}</MyContext.Provider>
    </>
  );
};

export default MyContextProvider;
