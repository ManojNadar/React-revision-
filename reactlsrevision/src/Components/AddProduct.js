import React, { useContext, useEffect } from "react";
import Navbar from "./Navbar";
import { MyContext } from "../MyContext/MyContext";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { state } = useContext(MyContext);
  const route = useNavigate();

  useEffect(() => {
    if (!state.currentuser) {
      route("/");
    }
  }, [state]);
  return (
    <>
      <Navbar />

      <h1>Add Product</h1>
    </>
  );
};

export default AddProduct;
