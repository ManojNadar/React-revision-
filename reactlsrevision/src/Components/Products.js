import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext/MyContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isProductsExist, setIsProductsExist] = useState(false);

  const { state } = useContext(MyContext);

  const route = useNavigate();

  useEffect(() => {
    const getProducts = JSON.parse(localStorage.getItem("products"));

    if (getProducts) {
      setIsProductsExist(true);
      setProducts(getProducts);
    } else {
      setIsProductsExist(false);
    }
  }, []);
  return (
    <>
      <Navbar />

      {isProductsExist ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            gap: "45px 0",
            marginTop: "2%",
          }}
        >
          {products.length ? (
            products.map((item) => (
              <div
                key={item.id}
                style={{
                  width: "22%",
                  height: "500px",
                  border: "2px solid grey",
                  boxShadow: "2px 2px 15px grey",
                  textAlign: "center",
                  marginLeft: "3%",
                }}
                onClick={() => route(`/singleproduct/${item.id}`)}
              >
                <img
                  width="100%"
                  height="60%"
                  src={item.image}
                  alt="broken image"
                />

                <h4>{item.title}</h4>
                <h2>Rs.{item.price}</h2>
                <h3>Category :{item.category}</h3>

                {state?.currentuser?.role === "seller" && (
                  <button
                    className="updateProdBtn"
                    style={{
                      marginTop: "3%",
                      backgroundColor: "aqua",
                      width: "50%",
                      height: "35px",
                    }}
                  >
                    UPDATE PRODUCT
                  </button>
                )}
              </div>
            ))
          ) : (
            <div>
              <h1>Loading...</h1>
            </div>
          )}
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1>No Products</h1>
        </div>
      )}
    </>
  );
};

export default Products;
