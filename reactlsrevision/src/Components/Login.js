import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext/MyContext";

const Login = () => {
  const [loginData, setLoginData] = useState({
    loginEmail: "",
    loginPassword: "",
  });

  const { state, login } = useContext(MyContext);
  const route = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoginData({ ...loginData, [name]: value });
  };

  const formSubmit = (e) => {
    e.preventDefault();

    const getUser = JSON.parse(localStorage.getItem("registerUser"));
    const { loginEmail, loginPassword } = loginData;
    if (loginEmail && loginPassword) {
      let flag = false;
      let currentuser;
      for (let i = 0; i < getUser.length; i++) {
        if (
          getUser[i].regEmail === loginEmail &&
          getUser[i].regPassword === loginPassword
        ) {
          flag = true;
          currentuser = getUser[i];
        }
      }

      if (flag) {
        login(currentuser);
        alert("login success");
        route("/");
      } else {
        alert("invalid credentials");
        setLoginData({
          loginEmail: "",
          loginPassword: "",
        });
      }
    } else {
      alert("please fill all the fields");
    }
  };

  return (
    <div className="registerScreen">
      <div className="loginContainer">
        <form onSubmit={formSubmit}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Enter your email"
            name="loginEmail"
            onChange={handleChange}
            value={loginData.loginEmail}
          />
          <br />
          <input
            type="password"
            placeholder="Enter your password"
            name="loginPassword"
            onChange={handleChange}
            value={loginData.loginPassword}
          />
          <br />
          <input type="submit" value="Login" />
          <p>
            New User ?<NavLink to="/register"> Regsiter</NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
