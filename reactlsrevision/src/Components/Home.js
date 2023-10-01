import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { MyContext } from "../MyContext/MyContext";
import Practice from "./practice";

const Home = () => {
  const [userHome, setuserHome] = useState("rocky");
  const { state } = useContext(MyContext);

  useEffect(() => {
    if (state) {
      setuserHome(state?.currentuser);
    }
  }, []);

  return (
    <>
      <Navbar />

      <div className="homeContainer">
        {state?.currentuser?.role === "seller" ? (
          <h1>Seller Logged in</h1>
        ) : state?.currentuser?.role === "buyer" ? (
          <h1>Buyer Logged in</h1>
        ) : (
          <h2>Home</h2>
        )}
      </div>

      <div style={{ width: "90%", margin: " 2% auto" }}>
        <img
          style={{ width: "100%", height: "400px" }}
          src="https://img.freepik.com/free-vector/shopping-time-banner-with-realistic-map-cart-gift-bags-vector-illustration_548887-120.jpg"
          alt=""
        />
      </div>
      <Practice userHome={userHome} />
    </>
  );
};

export default Home;
