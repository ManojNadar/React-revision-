import React from "react";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="homeContainer">
        <h2>Home</h2>
        <button className="loginlogout">Logout</button>
      </div>
    </>
  );
};

export default Home;
