import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const [regUser, setRegUser] = useState({
    regName: "",
    regEmail: "",
    regPassword: "",
    regConfirmPassword: "",
  });

  const route = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setRegUser({ ...regUser, [name]: value });
  };

  const { regName, regEmail, regPassword, regConfirmPassword } = regUser;
  const submitRegister = (e) => {
    e.preventDefault();

    if (regName && regEmail && regPassword && regConfirmPassword) {
      if (regPassword.length > 7) {
        if (regPassword === regConfirmPassword) {
          const getUser =
            JSON.parse(localStorage.getItem("registerUser")) || [];

          let flag = false;
          for (let i = 0; i < getUser.length; i++) {
            if (getUser[i].regEmail === regUser.regEmail) {
              flag = true;
            }
          }
          if (!flag) {
            const userObj = {
              ...regUser,
            };
            getUser.push(userObj);
            localStorage.setItem("registerUser", JSON.stringify(getUser));
            alert("registered Successfully done");

            setRegUser({
              regName: "",
              regEmail: "",
              regPassword: "",
              regConfirmPassword: "",
            });
          } else {
            alert("user already registered please try login");
            route("/login");
          }
        } else {
          alert("password doesnot match");
        }
      } else {
        alert("password must be atleast 7 characters or more");
      }
    } else {
      alert("please fill all the fields");
      setRegUser({
        regName: "",
        regEmail: "",
        regPassword: "",
        regConfirmPassword: "",
      });
    }
  };

  return (
    <div className="registerScreen">
      <div className="registerContainer">
        <form onSubmit={submitRegister}>
          <h2>Register</h2>
          <input
            type="text"
            placeholder="Enter your name"
            name="regName"
            onChange={handleChange}
            value={regUser.regName}
          />
          <br />
          <input
            type="email"
            placeholder="Enter your email"
            name="regEmail"
            onChange={handleChange}
            value={regUser.regEmail}
          />
          <br />
          <input
            type="password"
            placeholder="Enter your password"
            name="regPassword"
            onChange={handleChange}
            value={regUser.regPassword}
          />
          <br />
          <input
            type="password"
            placeholder="Confirm your password"
            name="regConfirmPassword"
            onChange={handleChange}
            value={regUser.regConfirmPassword}
          />
          <br />
          <input type="submit" value="Register" />
          <p>
            Already an User? <NavLink to="/login">Login</NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
