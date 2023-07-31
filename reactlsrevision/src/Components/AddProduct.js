import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { MyContext } from "../MyContext/MyContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";

const AddProduct = () => {
  const [prodDetails, setProdDetails] = useState({
    image: "",
    title: "",
    price: "",
    category: "Other",
  });
  const [product, setProduct] = useState([]);
  const { state } = useContext(MyContext);
  const route = useNavigate();

  const HandleProdDetails = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProdDetails({ ...prodDetails, [name]: value });
  };
  const HandleCategory = (e) => {
    const value = e.target.value;
    setProdDetails({ ...prodDetails, ["category"]: value });
  };

  const { image, title, price, category } = prodDetails;

  const handleProductSubmit = (e) => {
    e.preventDefault();

    if (image && title && price && category) {
      const getProduct = JSON.parse(localStorage.getItem("products")) || [];

      const prodObj = {
        ...prodDetails,
        id: uuidv4(),
      };

      getProduct.push(prodObj);
      localStorage.setItem("products", JSON.stringify(getProduct));
      toast.success("product added successfully");
      setProdDetails({
        image: "",
        title: "",
        price: "",
        category: "Other",
      });
    } else {
      toast.error("please fill all the fields");
      setProdDetails({
        image: "",
        title: "",
        price: "",
        category: "Other",
      });
    }
  };

  useEffect(() => {
    let currentuser = JSON.parse(localStorage.getItem("currentuser"));
    if (currentuser) {
      if (currentuser?.role == "buyer") {
        toast.error("sorry You are not a seller");
        route("/");
      }
    } else {
      route("/login");
      toast.error("Login First as a seller");
    }
  }, []);

  return (
    <>
      <Navbar />

      <form onSubmit={handleProductSubmit} className="addProductContainer">
        <input
          type="text"
          name="image"
          onChange={HandleProdDetails}
          placeholder="Product Image URL"
          value={prodDetails.image}
        />
        <br />
        <input
          type="text"
          name="title"
          onChange={HandleProdDetails}
          placeholder="Product Title"
          value={prodDetails.title}
        />
        <br />
        <input
          type="number"
          name="price"
          onChange={HandleProdDetails}
          placeholder="Product price"
          value={prodDetails.price}
        />
        <br />
        <select value={prodDetails.category} onChange={HandleCategory}>
          <option value="Other">Other</option>
          <option value="Mens">Mens</option>
          <option value="Womens">Womens</option>
          <option value="Kids">Kids</option>
          <option value="Fashion">Fashion</option>
          <option value="Accessories">Accessories</option>
        </select>
        <input type="submit" value="Add Product" />
      </form>
    </>
  );
};

export default AddProduct;
