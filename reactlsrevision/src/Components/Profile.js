import React, { useContext, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext/MyContext";

const Profile = () => {
  const { state } = useContext(MyContext);
  const route = useNavigate();

  return (
    <>
      <Navbar />

      <div
        style={{
          textAlign: "center",
          width: "50%",
          backgroundColor: "wheat",
          margin: "2% auto",
          height: "200px",
          lineHeight: "45px",
        }}
      >
        <h1>My Profile</h1>

        {state?.currentuser ? (
          <div>
            <h2>Name :{state.currentuser.regName} </h2>
            <h2>Eamil : {state.currentuser.regEmail}</h2>
            <button style={{ width: "50%", height: "50px" }}>
              Edit Profile
            </button>
          </div>
        ) : (
          <div>
            <h2>Please Login First to see your Profile Details </h2>
            <button
              onClick={() => route("/login")}
              style={{
                width: "50%",
                height: "50px",
                fontSize: "22px",
                fontWeight: "bolder",
              }}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
