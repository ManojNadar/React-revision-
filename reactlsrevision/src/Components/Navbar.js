import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext/MyContext";

const Navbar = () => {
  const [data, setData] = useState();
  const { state, logout } = useContext(MyContext);

  useEffect(() => {
    if (state) {
      setData(state.currentuser);
    }
  }, [state]);

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

        {data ? (
          <div
            style={{
              width: "80%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <NavLink to="/profile" className="navigations">
              Profile - {data?.regName}
            </NavLink>

            {data?.role === "seller" ? (
              <NavLink to="/addproduct" className="navigations">
                Add Product
              </NavLink>
            ) : null}

            {data?.role === "seller" ? null : (
              <NavLink to="/cart" className="navigations">
                Cart
              </NavLink>
            )}

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
