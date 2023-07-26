import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { MyContext } from "../MyContext/MyContext";
import { useNavigate } from "react-router-dom";

const SingleProduct = () => {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState({});

  const { state } = useContext(MyContext);
  const route = useNavigate();

  //   console.log(singleProduct);

  const fetchSingleProduct = async () => {
    const data = await fetch(`https://fakestoreapi.com/products/${id}`);
    const response = await data.json();

    setSingleProduct(response);
  };

  useEffect(() => {
    fetchSingleProduct();
  }, []);

  const addToCart = (id) => {
    const regUser = JSON.parse(localStorage.getItem("registerUser"));

    if (state?.currentuser) {
      for (let i = 0; i < regUser.length; i++) {
        if (regUser[i].regEmail === state.currentuser.regEmail) {
          regUser[i].cart.push(singleProduct);
          localStorage.setItem("registerUser", JSON.stringify(regUser));
          alert("product added");
          route("/products");
        }
      }
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ display: "flex", marginTop: "2%" }}>
        <div style={{ width: "60%" }}>
          <div style={{ width: "60%", margin: "auto" }}>
            <img width="100%" src={singleProduct.image} alt="" />
          </div>
        </div>

        <div style={{ width: "30%" }}>
          <h2>{singleProduct.title}</h2>
          <br />
          <p>{singleProduct.description}</p>
          <br />
          <h1>Rs.{singleProduct.price}</h1>
          <br />
          <h3>{singleProduct.category}</h3>
          <br />

          {state?.currentuser ? (
            <button
              style={{
                width: "70%",
                height: "50px",
                backgroundColor: "orange",
                fontSize: "22px",
                fontWeight: "bolder",
              }}
              onClick={() => addToCart(singleProduct.id)}
            >
              add to cart
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
