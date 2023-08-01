import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Register = () => {
  const [regUser, setRegUser] = useState({
    regName: "",
    regEmail: "",
    regPassword: "",
    regConfirmPassword: "",
    cart: [],
    role: "buyer",  
  });

  const route = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setRegUser({ ...regUser, [name]: value });
  };

  function handleRole(e) {
    const value = e.target.value;
    setRegUser({ ...regUser, ["role"]: value });
  }

  const { regName, regEmail, regPassword, regConfirmPassword, role } = regUser;

  const submitRegister = (e) => {
    e.preventDefault();

    if (regName && regEmail && role && regPassword && regConfirmPassword) {
      if (regPassword.length > 7) {
        if (regPassword === regConfirmPassword) {
          const getUser =
            JSON.parse(localStorage.getItem("registerUser")) || [];

          let flag = false;

          for (let i = 0; i < getUser.length; i++) {
            if (getUser[i].regEmail === regEmail) {
              flag = true;
            }
          }

          if (!flag) {
            const userObj = {
              ...regUser,
            };
            getUser.push(userObj);
            localStorage.setItem("registerUser", JSON.stringify(getUser));
            toast.success("registered Successfully done");
            route("/login");

            setRegUser({
              regName: "",
              regEmail: "",
              regPassword: "",
              regConfirmPassword: "",
            });
          } else {
            toast("user already registered please try login");
            route("/login");
          }
        } else {
          toast.error("password doesnot match");
        }
      } else {
        toast.error("password must be atleast 7 characters or more");
      }
    } else {
      toast.error("please fill all the fields");
      setRegUser({
        regName: "",
        regEmail: "",
        regPassword: "",
        regConfirmPassword: "",
      });
    }
  };

  // console.log(regUser);

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

          <div
            style={{ display: "flex", alignItems: "center", margin: "1% 0" }}
          >
            <p style={{ width: "20%", fontWeight: "bolder" }}>Select Role :</p>
            <select
              style={{
                width: "80%",
                height: "35px",
                backgroundColor: "aqua",
                fontWeight: "bolder",
              }}
              onChange={handleRole}
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

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
