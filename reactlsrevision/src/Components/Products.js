import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  const route = useNavigate();

  // console.log(products);
  const url = "https://fakestoreapi.com/products";

  async function fetchMultipleProducts() {
    const response = await fetch(url);
    const data = await response.json();
    setProducts(data);
  }
  useEffect(() => {
    fetchMultipleProducts();
  }, []);
  return (
    <>
      <Navbar />
      <h1 style={{ textAlign: "center" }}>Products</h1>

      <div
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          gap: "45px 0",
          marginTop: "2%",
        }}
      >
        {products.length ? (
          products.map((item) => (
            <div
              key={item.id}
              style={{
                width: "17%",
                height: "500px",
                border: "2px solid grey",
                boxShadow: "2px 2px 15px grey",
                textAlign: "center",
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
              <h4>Ratings :{item?.rating?.rate} *</h4>
            </div>
          ))
        ) : (
          <div>
            <h1>Loading...</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
