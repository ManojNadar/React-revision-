import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext/MyContext";
import { toast } from "react-hot-toast";

const Profile = () => {
  const { state, login } = useContext(MyContext);
  const [profileModal, setProfileModal] = useState(false);
  const [updateProfile, setUpdateProfile] = useState({
    name: "",
    password: "",
    cPassword: "",
  });
  const route = useNavigate();

  const handleUpdateProfile = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUpdateProfile({ ...updateProfile, [name]: value });
  };

  const handleprofileUpdateSubmit = (e) => {
    e.preventDefault();
    const { name, password, cPassword } = updateProfile;

    if (name && password && cPassword) {
      if (password.length > 7) {
        if (password === cPassword) {
          const currentuser = JSON.parse(localStorage.getItem("currentuser"));
          const regusers = JSON.parse(localStorage.getItem("registerUser"));

          let flag = false;
          for (let i = 0; i < regusers.length; i++) {
            if (regusers[i].regEmail === currentuser.regEmail) {
              regusers[i].regName = updateProfile.name;
              regusers[i].regPassword = updateProfile.password;
              regusers[i].regConfirmPassword = updateProfile.cPassword;
              currentuser.regName = updateProfile.name;
              currentuser.regPassword = updateProfile.password;
              currentuser.regConfirmPassword = updateProfile.cPassword;

              flag = true;

              if (flag) {
                localStorage.setItem("registerUser", JSON.stringify(regusers));
                localStorage.setItem(
                  "currentuser",
                  JSON.stringify(currentuser)
                );
                login(currentuser);
                toast.success("updated successfully");
                setUpdateProfile({ name: "", password: "", cPassword: "" });
                setProfileModal(false);
              }
            }
          }
        } else {
          alert("password does not match");
        }
      } else {
        alert("password must be more than 7 characters");
      }
    } else {
      alert("all fields are mandatory to update");
    }
  };
  return (
    <>
      <Navbar />

      {profileModal ? (
        <div className="profileModalContainer">
          <div className="profileModal">
            <div className="cross" onClick={() => setProfileModal(false)}>
              X
            </div>

            <form onSubmit={handleprofileUpdateSubmit}>
              <input
                type="text"
                placeholder="update Name"
                onChange={handleUpdateProfile}
                value={updateProfile.name}
                name="name"
              />
              <br />
              <input
                type="password"
                placeholder="update password"
                onChange={handleUpdateProfile}
                value={updateProfile.password}
                name="password"
              />
              <br />
              <input
                type="password"
                placeholder="confirm password"
                onChange={handleUpdateProfile}
                value={updateProfile.cPassword}
                name="cPassword"
              />
              <br />
              <button type="submit" value="update profile details">
                Update profile
              </button>
            </form>
          </div>
        </div>
      ) : null}

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
            <button
              style={{ width: "50%", height: "50px" }}
              onClick={() => setProfileModal(true)}
            >
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
