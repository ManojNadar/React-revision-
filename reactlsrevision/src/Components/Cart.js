import React, { useContext, useEffect } from "react";
import Navbar from "./Navbar";
import { MyContext } from "../MyContext/MyContext";

const Cart = () => {
  const { state } = useContext(MyContext);

  useEffect(() => {
    const regUser = JSON.parse(localStorage.getItem("registerUser"));

    if (state?.currentuser) {
      for (let i = 0; i < regUser.length; i++) {}
    }
  }, []);
  return (
    <>
      <Navbar />
      {state?.currentuser ? <h1>My Cart</h1> : <h1>Empty Cart</h1>}
    </>
  );
};

export default Cart;
