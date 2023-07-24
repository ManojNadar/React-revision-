import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext/MyContext";

const Navbar = () => {
  const { state, logout } = useContext(MyContext);

  const route = useNavigate();
  return (
    <div className="navbar">
      <div className="logo">
        <h1 className="navigations" onClick={() => route("/")}>
          LOGO
        </h1>
      </div>

      <div className="rightnav">
        <NavLink to="/products" className="navigations">
          Products
        </NavLink>

        {state?.currentuser ? (
          <div
            style={{
              width: "70%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <NavLink to="/profile" className="navigations">
              {state?.currentuser.regName}
            </NavLink>
            <NavLink to="/cart" className="navigations">
              Cart
            </NavLink>
            <button onClick={() => logout()} className="navigations">
              Logout
            </button>
          </div>
        ) : (
          <button onClick={() => route("/login")} className="navigations">
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
