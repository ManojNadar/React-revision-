import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <h1>LOGO</h1>
      </div>

      <div className="rightnav">
        <NavLink to="/profile" className="navigations">
          Profile
        </NavLink>
        <NavLink to="/products" className="navigations">
          Products
        </NavLink>
        <NavLink to="/cart" className="navigations">
          Cart
        </NavLink>
        <NavLink to="/login" className="navigations">
          Login
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
