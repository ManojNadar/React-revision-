import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { MyContext } from "../MyContext/MyContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Cart = () => {
  const [cartProd, setCartProd] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { state } = useContext(MyContext);
  const route = useNavigate();

  // console.log(state);

  useEffect(() => {
    const currentuser = JSON.parse(localStorage.getItem("currentuser"));

    if (currentuser?.role === "seller") {
      route("/");
    }
  }, []);

  useEffect(() => {
    const currentuser = JSON.parse(localStorage.getItem("currentuser"));
    const regusers = JSON.parse(localStorage.getItem("registerUser"));

    if (state?.currentuser && state?.currentuser?.role === "buyer") {
      for (let i = 0; i < regusers.length; i++) {
        if (regusers[i].regEmail === currentuser.regEmail) {
          setCartProd(regusers[i].cart);
        }
      }
    }
  }, [state]);

  useEffect(() => {
    if (cartProd.length) {
    }
    let sum = 0;
    for (let i = 0; i < cartProd.length; i++) {
      sum += parseInt(cartProd[i].price);
      // console.log(sum);
    }
    setTotalPrice(sum);
  }, [cartProd]);

  const removeSingleProduct = (id) => {
    const currentuser = JSON.parse(localStorage.getItem("currentuser"));
    const regusers = JSON.parse(localStorage.getItem("registerUser"));
    const filterItem = cartProd.filter((item) => item.id != id);

    if (state?.currentuser && state?.currentuser?.role === "buyer") {
      for (let i = 0; i < regusers.length; i++) {
        if (regusers[i].regEmail === currentuser.regEmail) {
          regusers[i].cart = filterItem;
          localStorage.setItem("registerUser", JSON.stringify(regusers));
          setCartProd(filterItem);
          // setTotalPrice(0);
          toast.success("Product removed");
        }
      }
    }
  };

  const checkOut = () => {
    const currentuser = JSON.parse(localStorage.getItem("currentuser"));
    const regusers = JSON.parse(localStorage.getItem("registerUser"));

    if (state?.currentuser && state?.currentuser?.role === "buyer") {
      for (let i = 0; i < regusers.length; i++) {
        if (regusers[i].regEmail === currentuser.regEmail) {
          regusers[i].cart = [];
          localStorage.setItem("registerUser", JSON.stringify(regusers));
          setCartProd([]);
          setTotalPrice(0);
          toast.success("Product will Deliver Soon");
        }
      }
    }
  };

  return (
    <>
      <Navbar />

      {state?.currentuser && state?.currentuser?.role === "buyer" ? (
        <div className="cartContainer">
          {cartProd?.length ? (
            <div className="cartProductSection">
              <div className="cartMainImgContainer">
                {cartProd.map((item) => (
                  <div className="cartImgSection" key={item.id}>
                    <img src={item.image} alt="" />
                    <h3>{item.title}</h3>
                    <h2>Rs.{item.price}</h2>
                    <h4>Category : {item.category}</h4>
                    <button
                      className="removeSingle"
                      onClick={() => removeSingleProduct(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="cartPriceSection">
                <h2>Total Price : Rs.{totalPrice}</h2>
                <p>Delivery Charge : FREE</p>
                <button onClick={checkOut}>CHECKOUT</button>
              </div>
            </div>
          ) : (
            <div>
              <h2>Your cart is empty</h2>
            </div>
          )}
        </div>
      ) : (
        <div className="noCart">
          <h1>Please Login to see your Cart</h1>
        </div>
      )}
    </>
  );
};

export default Cart;
