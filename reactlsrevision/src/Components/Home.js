import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext/MyContext";

const Home = () => {
  const [userHome, setuserHome] = useState();
  const { state, logout } = useContext(MyContext);
  const route = useNavigate();

  useEffect(() => {
    if (state) {
      setuserHome(state?.currentuser);
    }
  });

  // console.log(state);

  return (
    <>
      <Navbar />
      <div className="homeContainer">
        <h2>Home</h2>

        {userHome?.role === "seller" && <h1>Seller Logged in</h1>}
      </div>
    </>
  );
};

export default Home;
