import React, { useContext } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext/MyContext";

const Home = () => {
  const { state, logout } = useContext(MyContext);
  const route = useNavigate();

  // console.log(state);

  return (
    <>
      <Navbar />
      <div className="homeContainer">
        <h2>Home</h2>
      </div>
    </>
  );
};

export default Home;
